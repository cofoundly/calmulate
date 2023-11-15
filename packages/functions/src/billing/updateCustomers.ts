import { Customer, FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'

export const updateCustomers = async (customers: Customer[]) => {
  const batch = firebase.firestore().batch()
  const customersRef = firebase.firestore().collection(FirestoreCollection.Customers)

  for (const customer of customers) {
    const customerRef = customersRef.doc(customer.id)

    batch.set(customerRef, customer, { merge: true })
  }

  await batch.commit()
}
