import { FirestoreCollection, Subscription } from 'types'

import { firebase } from '@/firebase/admin'

export const getSubscription = async (id: string) => {
  const doc = await firebase.firestore().collection(FirestoreCollection.Subscriptions).doc(id).get()

  return {
    ...doc.data(),
    id,
  } as Subscription | undefined
}
