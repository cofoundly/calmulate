import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Functions, FunctionsMap } from 'types'

import { getAuthUser } from '@/auth/getAuthUser'
import { getSubscriptionByUid } from '@/billing/getSubscriptionByUid'
import { updateSubscriptionQuantity } from '@/billing/updateSubscriptionQuantity'

export const updateSubscriptionQuantityFunction = onCall<
  FunctionsMap[Functions.updateSubscriptionQuantity]['data'],
  Promise<FunctionsMap[Functions.updateSubscriptionQuantity]['response']>
>(async request => {
  try {
    // Authorized api requests only
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Unauthorized')
    }

    // Get the user from the request
    const user = await getAuthUser(request.auth.uid)

    if (!user) {
      throw new HttpsError('not-found', 'User not found')
    }

    // Destructure the data from the POST body
    const { quantity } = request.data

    // Get the Stripe subscriptionId using the userId
    // NOTE: this infers that only the subscription owner can update the subscription quantity
    const { id: subscriptionId } = await getSubscriptionByUid(user.uid)

    // Update the subscription quantity in Stripe
    await updateSubscriptionQuantity({ subscriptionId, quantity: Number(quantity) })

    return {
      ok: true,
    }
  } catch (error) {
    console.error(error)

    throw new HttpsError('internal', (error as Error).message, error)
  }
})
