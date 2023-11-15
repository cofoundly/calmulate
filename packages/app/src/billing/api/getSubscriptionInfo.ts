import { doc, getDoc } from 'firebase/firestore'
import { FirestoreCollection, SubscriptionInfo } from 'types'

import { db } from '@/firebase'

export const getSubscriptionInfo = async (subscriptionId: string) => {
  const ref = doc(db, FirestoreCollection.SubscriptionInfo, subscriptionId)
  const snapshot = await getDoc(ref)

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as SubscriptionInfo | undefined
}
