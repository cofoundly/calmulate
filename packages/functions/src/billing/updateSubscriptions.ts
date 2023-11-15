import { FirestoreCollection, Subscription } from 'types'

import { firebase } from '@/firebase/admin'

export const updateSubscriptions = async (subscriptions: Subscription[]) => {
  const batch = firebase.firestore().batch()
  const subscriptionsRef = firebase.firestore().collection(FirestoreCollection.Subscriptions)

  for (const subscription of subscriptions) {
    const subscriptionRef = subscriptionsRef.doc(subscription.id)

    batch.set(subscriptionRef, subscription, { merge: true })
  }

  await batch.commit()
}
