import { UserRecord } from 'firebase-admin/auth'

import { getAuthUserByEmail } from '@/auth/getAuthUserByEmail'

import { copyBillingDetailsToCustomer } from './copyBillingDetailsToCustomer'
import { getCustomer } from './getCustomer'
import { Stripe, stripe } from './stripe'
import { updateCustomer } from './updateCustomer'
import { updateSubscription } from './updateSubscription'

export const manageSubscriptionStatusChange = async ({
  subscriptionId,
  customerId,
  isNewSubscription,
}: {
  subscriptionId: string
  customerId: string
  isNewSubscription: boolean
}) => {
  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['customer', 'default_payment_method'],
  })

  let uid: string | null = null
  let user: UserRecord | undefined

  // using the customer email, see if we have a user already
  const email = (stripeSubscription.customer as Stripe.Customer)?.email

  if (email) {
    user = await getAuthUserByEmail(email)

    if (user) {
      uid = user.uid
    }
  }

  const customer = await getCustomer(customerId)

  if (uid && customer && !customer.ownerId) {
    // if this was a guest user that had an existing user account, we would have created a customer record with the ownerId set to null
    // therefore we need to get the customer, if ownerId is null, set it to the uid
    await updateCustomer({
      id: customer.id,
      ownerId: uid,
    })
  }

  if (!uid && customer && customer.ownerId) {
    uid = customer.ownerId
  }

  await updateSubscription({ stripeSubscription, customerId, uid })

  if (isNewSubscription) {
    // for a new subscription copy the billing details to the customer object.
    if (stripeSubscription.default_payment_method && typeof stripeSubscription.default_payment_method !== 'string') {
      await copyBillingDetailsToCustomer(stripeSubscription.default_payment_method, uid)
    }
  }
}
