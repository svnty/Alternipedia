'use server'

import { headers } from 'next/headers'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

import { stripe } from '../../lib/stripe'

export async function fetchClientSecret() {
  const origin = (await headers()).get('origin');

  // Try to grab the current NextAuth session (server action context)
  let email: string | undefined
  try {
    const session = await getServerSession(authOptions as any) as any
    email = session?.user?.email ?? undefined
  } catch (e) {
    // ignore - session may not be available in all contexts
  }

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    ui_mode: 'embedded',
    line_items: [
      {
        price: 'price_1SK5aD4HdUbnAvC5wF4GR9xa',
        quantity: 1
      }
    ],
    mode: 'subscription',
    // attach the signed-in user's email into metadata for reliable lookup in the webhook
    metadata: email ? { email } : undefined,
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret
}