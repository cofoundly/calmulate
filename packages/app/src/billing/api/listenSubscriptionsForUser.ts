import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { FirestoreCollection, Subscription } from 'types'

import { db } from '@/firebase'

// listen for the user's subscriptions
export const listenSubscriptionsForUser = (uid: string, cb: (data: Subscription[]) => void) => {
  const ref = collection(db, FirestoreCollection.Subscriptions)
  const queryRef = query(ref, where('ownerId', '==', uid))

  return onSnapshot(queryRef, snapshot => {
    const subscriptionSeats = snapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Subscription),
    )

    cb(subscriptionSeats)
  })
}
