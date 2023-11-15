import { collection, getDocs, query, where } from 'firebase/firestore'
import { FirestoreCollection, Price } from 'types'

import { db } from '@/firebase'

// fetch the active prices
export const getPrices = async () => {
  const ref = collection(db, FirestoreCollection.Prices)
  const queryRef = query(ref, where('active', '==', true))

  const snapshot = await getDocs(queryRef)

  return snapshot.docs.map(price => ({
    id: price.id,
    ...price.data(),
  })) as Price[]
}
