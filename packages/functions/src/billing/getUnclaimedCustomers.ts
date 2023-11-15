import { Customer, FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'

export const getUnclaimedCustomers = async (ids: string[]) => {
  // we can't use the FirestoreCollection in operator on an empty array
  if (!ids.length) {
    return []
  }

  const docs = await firebase
    .firestore()
    .collection(FirestoreCollection.Customers)
    .where('id', 'in', ids)
    .where('ownerId', '==', null)
    .get()

  return docs.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Customer[]
}
