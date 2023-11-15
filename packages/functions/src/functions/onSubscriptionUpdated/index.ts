import { onDocumentUpdated } from 'firebase-functions/v2/firestore'
import { HttpsError } from 'firebase-functions/v2/https'
import { SubscriptionInfo } from 'types'

import { getSubscriptionInfo } from '@/billing/getSubscriptionInfo'
import { updateSubscriptionInfo } from '@/billing/updateSubscriptionInfo'

export const onSubscriptionUpdated = onDocumentUpdated('subscriptions/{subscriptionId}', async event => {
  try {
    const subscriptionId = event.params?.subscriptionId
    const subscription = event.data?.after.data()

    if (!subscription) {
      throw new HttpsError('not-found', 'Subscription not found')
    }

    const subscriptionInfo = await getSubscriptionInfo(subscriptionId)

    const id = subscription.id
    const priceId = subscription.priceId // the priceId may have changed
    const status = subscription.status // the status may have changed
    const totalSeats = subscription.quantity // the quantity may have changed
    const assignedSeats = subscriptionInfo?.assignedSeats || 1 // can't be lower than 1
    const availableSeats = totalSeats - assignedSeats // we need to update the available seats to reflect the new quantity (if it changed)

    const newSubscriptionInfo: SubscriptionInfo = {
      id,
      priceId,
      status,
      totalSeats,
      assignedSeats,
      availableSeats,
    }

    await updateSubscriptionInfo(newSubscriptionInfo)
  } catch (error) {
    console.error(error)

    throw error
  }
})
