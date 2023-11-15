import { stripe } from './stripe'

export const createBillingPortalSession = async ({
  customerId,
  returnUrl,
}: {
  customerId: string
  returnUrl: string
}) =>
  await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
