import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { HttpsError } from 'firebase-functions/v2/https'
import { SubscriptionInfo } from 'types'

import { getSubscription } from '@/billing/getSubscription'
import { getSubscriptionInfo } from '@/billing/getSubscriptionInfo'
import { updateSubscriptionInfo } from '@/billing/updateSubscriptionInfo'

export const onSubscriptionSeatCreated = onDocumentCreated(
  'subscriptions/{subscriptionId}/seats/{seatId}',
  async event => {
    try {
      const subscriptionId = event.params?.subscriptionId

      const subscription = await getSubscription(subscriptionId)

      if (!subscription) {
        throw new HttpsError('not-found', 'Subscription not found')
      }

      const subscriptionInfo = await getSubscriptionInfo(subscriptionId)

      const id = subscription.id
      const priceId = subscription.priceId
      const status = subscription.status
      const totalSeats = subscription.quantity
      const assignedSeats = subscriptionInfo?.assignedSeats || 0

      const newAssignedSeats = assignedSeats + 1
      const newAvailableSeats = totalSeats - newAssignedSeats

      const newSubscriptionInfo: SubscriptionInfo = {
        id,
        priceId,
        status,
        totalSeats,
        assignedSeats: newAssignedSeats,
        availableSeats: newAvailableSeats,
      }

      await updateSubscriptionInfo(newSubscriptionInfo)
    } catch (error) {
      console.error(error)

      throw error
    }
  },
)
