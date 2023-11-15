import { FirestoreCollection, SubscriptionSeat } from 'types'

import { firebase } from '@/firebase/admin'

export const updateSubscriptionSeats = async (subscriptionSeats: SubscriptionSeat[]) => {
  const batch = firebase.firestore().batch()
  const subscriptionsRef = firebase.firestore().collection(FirestoreCollection.Subscriptions)

  for (const seat of subscriptionSeats) {
    const seatRef = subscriptionsRef
      .doc(seat.subscriptionId)
      .collection(FirestoreCollection.SubscriptionSeats)
      .doc(seat.id)

    batch.set(seatRef, seat, { merge: true })
  }

  await batch.commit()
}
