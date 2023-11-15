import { stripe } from './stripe'

export const updateSubscriptionQuantity = async ({
  subscriptionId,
  quantity,
}: {
  subscriptionId: string
  quantity: number
}) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  if (!subscription) {
    throw new Error(`Subscription ${subscriptionId} not found`)
  }

  stripe.subscriptions.update(subscription.id, {
    cancel_at_period_end: false,
    proration_behavior: 'create_prorations',
    items: [
      {
        id: subscription.items.data[0].id,
        quantity,
      },
    ],
  })
}
