import { deleteSubscriptions } from '@/billing/deleteSubscriptions'
import { getUnclaimedCustomers } from '@/billing/getUnclaimedCustomers'
import { getUnclaimedSubscriptions } from '@/billing/getUnclaimedSubscriptions'
import { stripe } from '@/billing/stripe'
import { updateCustomers } from '@/billing/updateCustomers'
import { updateSubscriptions } from '@/billing/updateSubscriptions'
import { updateUser } from '@/users/updateUser'

export const claimGuestSubscriptions = async ({ uid, email }: { uid: string; email: string }) => {
  // claim any subscriptions where the ownerId is null and the email matches the new user's email
  // recreate the subscription to trigger the subscription flows
  const subscriptions = await getUnclaimedSubscriptions(email)

  if (!subscriptions.length) {
    return
  }

  const newSubscriptions = subscriptions.map(subscription => ({
    ...subscription,
    ownerId: uid,
  }))

  // first delete the old subscriptions so that we don't trigger the onSubscriptionUpdated function
  await deleteSubscriptions(subscriptions)

  // add a delay to avoid a race condition between onDeleteSubscription and onUpdateSubscription
  await new Promise(resolve => setTimeout(resolve, 1000))

  // recreate the new subscriptions
  await updateSubscriptions(newSubscriptions)

  // claim any unclaimed customers
  // if that customer exists, get the customer from Firebase using the customer's id
  const stripeCustomersIds = subscriptions.map(subscription => subscription.stripeCustomerId)

  const customers = await getUnclaimedCustomers(stripeCustomersIds)

  // update the customers with the user's id
  const newCustomers = customers.map(customer => ({
    ...customer,
    ownerId: uid,
  }))

  // update the customers
  await updateCustomers(newCustomers)

  // add the customer payment info to the user's payment info
  // by fetching the customer's subscriptions
  for await (const subscription of subscriptions) {
    const stripeSubscription = await stripe.subscriptions.retrieve(subscription.id, {
      expand: ['default_payment_method'],
    })

    if (stripeSubscription.default_payment_method && typeof stripeSubscription.default_payment_method !== 'string') {
      const { address } = stripeSubscription.default_payment_method.billing_details

      await updateUser(uid, {
        billingAddress: {
          city: address?.city || '',
          country: address?.country || '',
          line1: address?.line1 || '',
          line2: address?.line2 || '',
          postalCode: address?.postal_code || '',
          state: address?.state || '',
        },
        paymentMethod: {
          brand: stripeSubscription.default_payment_method.card?.brand || '',
          expMonth: stripeSubscription.default_payment_method.card?.exp_month || 0,
          expYear: stripeSubscription.default_payment_method.card?.exp_year || 0,
          last4: stripeSubscription.default_payment_method.card?.last4 || '',
        },
      })
    }
  }
}
