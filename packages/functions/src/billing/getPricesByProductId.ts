import { FirestoreCollection, Price } from 'types'

import { firebase } from '@/firebase/admin'

export const getPricesByProductId = async (productId: string) => {
  const docs = await firebase
    .firestore()
    .collection(FirestoreCollection.Prices)
    .where('productId', '==', productId)
    .get()

  return docs.docs.map(doc => doc.data()) as Price[]
}
