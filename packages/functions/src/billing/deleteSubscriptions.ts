import { FirestoreCollection, Subscription } from 'types'

import { firebase } from '@/firebase/admin'

export const deleteSubscriptions = async (subscriptions: Subscription[]) => {
  const batch = firebase.firestore().batch()

  subscriptions.forEach(subscription => {
    const ref = firebase.firestore().collection(FirestoreCollection.Subscriptions).doc(subscription.id)

    batch.delete(ref)
  })

  await batch.commit()
}
