import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  if (req.method === "POST") {
    // Accept either a price_id (for preset price objects) or an amount (in cents) for a custom donation.
    // If both are provided, prefer amount.
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { lang, price_id, amount } = payload;
    const origin = req.headers.origin;

    try {
      // try to get signed-in user's email and attach as metadata (optional)
      let metadata: Record<string,string> | undefined
      try {
        const sessionAuth = await getServerSession(req as any, res as any, authOptions as any) as any
        if (sessionAuth?.user?.email) metadata = { email: sessionAuth.user.email }
      } catch (e) {
        // ignore if session retrieval fails; donations can be anonymous
      }

      // const currency = (process.env.DEFAULT_CURRENCY || 'usd').toLowerCase();

      let line_items: any[] = [];

      if (typeof amount === 'number') {
        // amount expected in cents (integer)
        if (!Number.isInteger(amount) || amount <= 0) {
          return res.status(400).json({ error: 'Invalid amount' });
        }
        // optional minimum check: 50 cents
        if (amount < 50) {
          return res.status(400).json({ error: 'Minimum donation is 50 cents' });
        }

        line_items = [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Donation to Alternipedia' },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ];
      } else if (typeof price_id === 'string' && price_id.length > 0) {
        line_items = [{ price: price_id, quantity: 1 }];
      } else {
        return res.status(400).json({ error: 'Missing price_id or amount' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        metadata: metadata,
        success_url: `${origin}/${lang}/stripe/return`,
        cancel_url: `${origin}/${lang}/stripe/cancel`,
      });

      return res.status(200).json({ url: session.url });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create session" });
    }
  }
}