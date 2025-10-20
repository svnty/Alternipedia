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
    const { lang, price_id } = JSON.parse(req.body);
    const origin = req.headers.origin;

    console.log("Price ID:", price_id);

    try {
      // try to get signed-in user's email and attach as metadata (optional)
      let metadata: Record<string,string> | undefined
      try {
        const sessionAuth = await getServerSession(req as any, res as any, authOptions as any) as any
        if (sessionAuth?.user?.email) metadata = { email: sessionAuth.user.email }
      } catch (e) {
        // ignore if session retrieval fails; donations can be anonymous
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{ price: price_id, quantity: 1 }],
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