import { FirestoreCollection, SubscriptionSeat } from 'types'

import { firebase } from '@/firebase/admin'

export const deleteSubscriptionSeats = async (subscriptionSeats: SubscriptionSeat[]) => {
  const batch = firebase.firestore().batch()

  subscriptionSeats.forEach(subscriptionSeat => {
    const ref = firebase
      .firestore()
      .collection(FirestoreCollection.Subscriptions)
      .doc(subscriptionSeat.subscriptionId)
      .collection('seats')
      .doc(subscriptionSeat.id)

    batch.delete(ref)
  })

  await batch.commit()
}
