import { collectionGroup, getDocs, query, where } from 'firebase/firestore'
import { FirestoreCollection, SubscriptionSeat } from 'types'

import { db } from '@/firebase'

// fetch the users subscription seats
export const getSubscriptionSeatsForUser = async (uid: string) => {
  const ref = collectionGroup(db, FirestoreCollection.SubscriptionSeats)
  const queryRef = query(ref, where('userId', '==', uid))

  const snapshot = await getDocs(queryRef)

  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      } as SubscriptionSeat),
  )
}
