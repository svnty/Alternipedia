import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

import { prisma } from '@/lib/prisma'
import { stripe as stripeClient } from '@/lib/stripe'

// Disable body parsing so we can verify Stripe signatures using the raw body
export const config = {
  api: {
    bodyParser: false,
  },
}

// Helper to read raw request body
async function getRawBody(req: NextApiRequest) {
  return await new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = []
    req.on('data', (chunk: Uint8Array) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', (err) => reject(err))
  })
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const sig = req.headers['stripe-signature'] as string | undefined
  let event: Stripe.Event

  try {
    const buf = await getRawBody(req)

    if (!webhookSecret) {
      // If no webhook secret configured, try to parse JSON body (useful for local debug)
      const json = JSON.parse(buf.toString('utf8'))
      event = json
    } else {
      if (!sig) throw new Error('Missing stripe-signature header')
      event = stripeClient.webhooks.constructEvent(buf, sig, webhookSecret) as Stripe.Event
    }
  } catch (err: any) {
    console.error('⚠️  Webhook signature verification failed.', err?.message || err)
    return res.status(400).send(`Webhook Error: ${err?.message || err}`)
  }

  // Handle the event types we care about
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any

        // For subscription mode, session.subscription will contain the subscription id
        if (session.mode === 'subscription' && session.subscription) {
          const subRaw = await stripeClient.subscriptions.retrieve(session.subscription as string) as any

          const customerId = typeof subRaw.customer === 'string' ? subRaw.customer : subRaw.customer?.id
          // Prefer email from the session (customer_details) then fall back to customer record
          const cust = customerId ? (await stripeClient.customers.retrieve(customerId) as any) : null
          const email = session.customer_details?.email ?? cust?.email ?? null

          if (!email) {
            console.warn('No email available on checkout.session.completed; skipping DB update')
            break
          }

          const user = await prisma.user.findUnique({ where: { email: email } })
          if (!user) {
            console.warn(`No local user found for email=${email}; skipping subscription attach`)
            break
          }

          // Upsert subscription record in our DB
          await (prisma as any).subscription.upsert({
            where: { stripeSubId: subRaw.id },
            create: {
              userId: user.id,
              stripeSubId: subRaw.id,
              plan: 'PRO',
              status: subRaw.status,
              currentPeriodEnd: new Date((subRaw.current_period_end ?? 0) * 1000),
            },
            update: {
              status: subRaw.status,
              currentPeriodEnd: new Date((subRaw.current_period_end ?? 0) * 1000),
            },
          })

          // Update the user record to reflect active subscription
          await prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customerId,
              subscriptionTier: 'PRO',
              subscriptionStartedAt: new Date((subRaw.start_date ?? Date.now() / 1000) * 1000),
              subscriptionExpiresAt: new Date((subRaw.current_period_end ?? 0) * 1000),
            },
          })
        }

        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as any

        // Try to get customer email to lookup user
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id
        let email: string | null = null
        try {
          const cust = customerId ? (await stripeClient.customers.retrieve(customerId) as any) : null
          email = cust?.email ?? null
        } catch (e) {
          console.warn('Failed to retrieve customer for subscription event', e)
        }

        if (!email) {
          console.warn('No customer email found on subscription event; skipping')
          break
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
          console.warn(`No local user for email=${email} on subscription event`)
          break
        }

        // Upsert subscription row
        await (prisma as any).subscription.upsert({
          where: { stripeSubId: sub.id },
          create: {
            userId: user.id,
            stripeSubId: sub.id,
            plan: 'PRO',
            status: sub.status,
            currentPeriodEnd: new Date((sub.current_period_end ?? 0) * 1000),
          },
          update: {
            status: sub.status,
            currentPeriodEnd: new Date((sub.current_period_end ?? 0) * 1000),
          },
        })

        // Update user's subscription fields
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId: customerId,
            subscriptionTier: sub.status === 'active' || sub.status === 'trialing' ? 'PRO' : 'FREE',
            subscriptionStartedAt: sub.start_date ? new Date(sub.start_date * 1000) : undefined,
            subscriptionExpiresAt: sub.current_period_end ? new Date(sub.current_period_end * 1000) : undefined,
          },
        })

        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as any
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id
        let email: string | null = null
        try {
          const cust = customerId ? (await stripeClient.customers.retrieve(customerId) as any) : null
          email = cust?.email ?? null
        } catch (e) {
          console.warn('Failed to retrieve customer for subscription.deleted', e)
        }

        if (!email) break

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) break

        // mark user as free
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionTier: 'FREE',
            subscriptionExpiresAt: new Date(),
          },
        })

        // update subscription record if exists
        await (prisma as any).subscription.updateMany({
          where: { stripeSubId: sub.id },
          data: { status: sub.status, currentPeriodEnd: new Date((sub.current_period_end ?? 0) * 1000) },
        })

        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any
        // A successful invoice often indicates a renewal payment for a subscription
        if (invoice.subscription && typeof invoice.subscription === 'string') {
          const sub = await stripeClient.subscriptions.retrieve(invoice.subscription) as any
          const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id
          const cust = customerId ? (await stripeClient.customers.retrieve(customerId) as any) : null
          const email = cust?.email ?? null
          if (!email) break

          const user = await prisma.user.findUnique({ where: { email } })
          if (!user) break

          // update subscription row / user expiry
          await (prisma as any).subscription.updateMany({
            where: { stripeSubId: sub.id },
            data: { status: sub.status, currentPeriodEnd: new Date((sub.current_period_end ?? 0) * 1000) },
          })

          await prisma.user.update({
            where: { id: user.id },
            data: { subscriptionTier: 'PRO', subscriptionExpiresAt: new Date((sub.current_period_end ?? 0) * 1000) },
          })
        }

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any
        if (invoice.subscription && typeof invoice.subscription === 'string') {
          const sub = await stripeClient.subscriptions.retrieve(invoice.subscription) as any
          const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id
          const cust = customerId ? (await stripeClient.customers.retrieve(customerId) as any) : null
          const email = cust?.email ?? null
          if (!email) break

          const user = await prisma.user.findUnique({ where: { email } })
          if (!user) break

          // Optionally mark user as lapsed - we keep the subscription row but set tier to FREE
          await prisma.user.update({
            where: { id: user.id },
            data: { subscriptionTier: 'FREE' },
          })
        }
        break
      }

      default:
        // Unhandled events are ignored
        console.log(`Unhandled event type ${event.type}`)
    }

    return res.status(200).json({ received: true })
  } catch (err) {
    console.error('Error handling webhook event', err)
    return res.status(500).end()
  }
}
