import { onDocumentDeleted } from 'firebase-functions/v2/firestore'

import { deleteSubscriptionInfo } from '@/billing/deleteSubscriptionInfo'

export const onSubscriptionDeleted = onDocumentDeleted('subscriptions/{subscriptionId}', async event => {
  try {
    const subscriptionId = event.params?.subscriptionId

    // delete the subscription info
    await deleteSubscriptionInfo(subscriptionId)
  } catch (error) {
    console.error(error)

    throw error
  }
})
