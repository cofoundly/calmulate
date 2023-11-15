import { FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'

import { deletePrice } from './deletePrice'
import { getPricesByProductId } from './getPricesByProductId'

export const deleteProduct = async (id: string) => {
  // stripe does not send a price.deleted event when a product is deleted
  // so we need to manually delete the price associated with the product
  const prices = await getPricesByProductId(id)

  const pricePromises = prices.map(price => deletePrice(price.id))

  await Promise.all(pricePromises)

  await firebase.firestore().collection(FirestoreCollection.Products).doc(id).delete()
}
