import { FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'
import { deleteDocs } from '@/firebase/deleteDocs'

export const deleteAssignedSubscriptionSeatsByEmail = async ({
  subscriptionId,
  email,
}: {
  subscriptionId: string
  email: string
}) => {
  const docs = await firebase
    .firestore()
    .collection(FirestoreCollection.Subscriptions)
    .doc(subscriptionId)
    .collection('seats')
    .where('isSubscriptionOwner', '==', false)
    .where('email', '==', email)
    .get()

  await deleteDocs(docs)
}
