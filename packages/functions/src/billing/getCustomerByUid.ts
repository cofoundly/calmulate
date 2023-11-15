import { Customer, FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'

export const getCustomerByUid = async (uid: string) => {
  const doc = await firebase.firestore().collection(FirestoreCollection.Customers).where('ownerId', '==', uid).get()

  if (!doc.docs[0]) {
    return undefined
  }

  return {
    id: doc.docs[0].id,
    ...doc.docs[0].data(),
  } as Customer
}
