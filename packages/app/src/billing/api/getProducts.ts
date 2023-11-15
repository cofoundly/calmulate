import { collection, getDocs, query, where } from 'firebase/firestore'
import { FirestoreCollection, Product } from 'types'

import { db } from '@/firebase'

// fetch the active products
export const getProducts = async () => {
  const ref = collection(db, FirestoreCollection.Products)
  const queryRef = query(ref, where('active', '==', true))

  const snapshot = await getDocs(queryRef)

  return snapshot.docs.map(product => ({
    id: product.id,
    ...product.data(),
  })) as Product[]
}
