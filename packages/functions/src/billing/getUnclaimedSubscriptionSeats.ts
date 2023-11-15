import { FirestoreCollection, SubscriptionSeat } from 'types'

import { firebase } from '@/firebase/admin'

export const getUnclaimedSubscriptionSeats = async (email: string) => {
  const docs = await firebase
    .firestore()
    .collectionGroup(FirestoreCollection.SubscriptionSeats)
    .where('userId', '==', null)
    .where('email', '==', email)
    .get()

  return docs.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as SubscriptionSeat[]
}
