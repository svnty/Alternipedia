import { redirect } from 'next/navigation'

import { stripe } from '@/lib/stripe';

export default async function Return({ searchParams }: { searchParams: any }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details } = session;
  const customerEmail = customer_details?.email ?? null;

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id="success" className="flex justify-center text-center mt-36 min-h-64">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please contact support.
        </p>
      </section>
    )
  }
}