import { FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'

export const deleteSubscriptionInfo = async (subscriptionInfo: string) => {
  await firebase.firestore().collection(FirestoreCollection.SubscriptionInfo).doc(subscriptionInfo).delete()
}
