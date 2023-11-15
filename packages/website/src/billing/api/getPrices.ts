import { FirestoreCollection, Price } from 'types'

import { firebase } from '@/firebase/admin'

// fetch the active prices
export const getPrices = async () => {
  const ref = firebase.firestore().collection(FirestoreCollection.Prices).where('active', '==', true)
  const snapshot = await ref.get()

  return snapshot.docs.map(price => ({
    id: price.id,
    ...price.data(),
  })) as Price[]
}
