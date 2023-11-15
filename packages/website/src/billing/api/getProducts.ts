import { FirestoreCollection, Product } from 'types'

import { firebase } from '@/firebase/admin'

// fetch the active products
export const getProducts = async () => {
  const ref = firebase.firestore().collection(FirestoreCollection.Products).where('active', '==', true)
  const snapshot = await ref.get()

  return snapshot.docs.map(product => ({
    id: product.id,
    ...product.data(),
  })) as Product[]
}
