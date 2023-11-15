import { Stripe, stripe } from './stripe'

export const createCheckoutSession = async ({
  customerId,
  priceId,
  quantity,
  freeTrialDays,
  metadata,
  successUrl,
  cancelUrl,
}: {
  customerId?: string
  priceId: string
  quantity?: number
  freeTrialDays?: number
  metadata?: Record<string, string>
  successUrl: string
  cancelUrl: string
}) => {
  const params: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      {
        price: priceId,
        quantity,
        adjustable_quantity: {
          enabled: true,
        },
      },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: freeTrialDays,
      metadata,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  }

  // we may not have a customerId if it's a guest session
  if (customerId) {
    params.customer = customerId
    params.customer_update = {
      address: 'auto',
    }
  }

  return await stripe.checkout.sessions.create(params)
}
