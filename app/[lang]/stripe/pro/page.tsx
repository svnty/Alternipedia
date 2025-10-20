'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import { fetchClientSecret } from '@/lib/actions/stripe';
import { useSession } from 'next-auth/react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function Checkout() {

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session?.user) {
    return <p>Please sign in to proceed to checkout.</p>;
  }

  return (
    <div id="checkout" className='my-6'>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret: async () => {
            const secret = await fetchClientSecret();
            if (secret === null) {
              throw new Error('Stripe client secret is null');
            }
            return secret;
          }
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}