import { FirestoreCollection, SubscriptionInfo } from 'types'

import { firebase } from '@/firebase/admin'

export const updateSubscriptionInfo = async (subscriptionInfo: SubscriptionInfo) => {
  await firebase
    .firestore()
    .collection(FirestoreCollection.SubscriptionInfo)
    .doc(subscriptionInfo.id)
    .set(subscriptionInfo, { merge: true })
}
