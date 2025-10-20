# Stripe webhooks (local setup and notes)

This project receives Stripe events via a Next.js API route at `pages/api/stripe-webhook.ts`.

What it does
- Verifies Stripe webhook signatures using `process.env.STRIPE_WEBHOOK_SECRET` (recommended in production).
- Handles events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_succeeded`, `invoice.payment_failed`.
- Updates the `User` and `Subscription` tables via Prisma to set `subscriptionTier`, `subscriptionStartedAt`, `subscriptionExpiresAt`, and to upsert subscription rows.

Environment
- `STRIPE_SECRET_KEY` — your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` — the webhook signing secret created for your endpoint (important for security)
- `DATABASE_URL`, etc. for Prisma

Local testing with Stripe CLI
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Start your local dev server (Next.js):

```bash
npm run dev:web
```

3. Forward events from Stripe to your local webhook (adjust port/host if using a different port):

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook --print-secret
```

The `--print-secret` flag prints the webhook secret which you can set in your `.env` as `STRIPE_WEBHOOK_SECRET`.

Quick test events (in another terminal):

```bash
# simulate a completed checkout session (replace the session id with a real test session if needed)
stripe trigger checkout.session.completed

# simulate subscription events
stripe trigger customer.subscription.created
stripe trigger customer.subscription.updated
stripe trigger customer.subscription.deleted

# invoices
stripe trigger invoice.payment_succeeded
stripe trigger invoice.payment_failed
```

Notes & Next steps
- The handler currently attempts to match Stripe customers to local users by email. If your checkout flow supports creating customers with an identifying metadata (like `metadata.userId`), prefer that for reliable linking.
- Consider adding idempotency safeguards (store `event.id` in DB) to avoid processing duplicates.
- Add monitoring/alerts for webhook failures and retries.

