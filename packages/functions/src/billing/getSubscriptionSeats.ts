import { FirestoreCollection, SubscriptionSeat } from 'types'

import { firebase } from '@/firebase/admin'

export const getSubscriptionSeats = async (userId: string) => {
  const docs = await firebase
    .firestore()
    .collectionGroup(FirestoreCollection.SubscriptionSeats)
    .where('userId', '==', userId)
    .get()

  return docs.docs.map(doc => doc.data()) as SubscriptionSeat[]
}
