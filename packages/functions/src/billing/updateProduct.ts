import { FirestoreCollection, Product } from 'types'

import { firebase } from '@/firebase/admin'

import { Stripe } from './stripe'

export const updateProduct = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    name: product.name,
    description: product.description || '',
    active: product.active,
    image: product.images[0] || '',
    metadata: product.metadata,
  }

  await firebase.firestore().collection(FirestoreCollection.Products).doc(product.id).set(productData)
}
