import { Customer, FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'

export const updateCustomer = async (data: Customer) => {
  await firebase.firestore().collection(FirestoreCollection.Customers).doc(data.id).set(data, { merge: true })
}
