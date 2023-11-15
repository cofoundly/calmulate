import { FirestoreCollection, Price, Product } from 'types'

import { firebase } from '@/firebase/admin'

export const getProductByPriceId = async (priceId: string) => {
  const priceDoc = await firebase.firestore().collection(FirestoreCollection.Prices).doc(priceId).get()

  if (!priceDoc.exists) {
    throw new Error('Price doc not found')
  }

  const priceData = priceDoc.data() as Price

  if (!priceData) {
    throw new Error('Price data not found')
  }

  const productDoc = await firebase.firestore().collection(FirestoreCollection.Products).doc(priceData.productId).get()

  if (!productDoc.exists) {
    throw new Error('Product doc not found')
  }

  const productData = productDoc.data() as Product

  if (!productData) {
    throw new Error('Product data not found')
  }

  return productData
}
