import { Price, Product } from 'types'

export const sortProductsByPrice = ({ products, prices }: { products?: Product[]; prices?: Price[] }): Product[] => {
  const sortedProducts = products?.sort((productA, productB) => {
    const priceA = prices?.filter(price => price.productId === productA.id)[0]
    const priceB = prices?.filter(price => price.productId === productB.id)[0]

    // sort by price
    return (priceA?.unitAmount || 0) - (priceB?.unitAmount || 0)
  })

  return sortedProducts || []
}
