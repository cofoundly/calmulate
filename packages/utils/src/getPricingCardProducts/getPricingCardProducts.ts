import { BillingInterval, Price, PricingCardProduct, Product } from 'types'

import { parseProductMetadata } from './parseProductMetadata'
import { sortProductsByPrice } from './sortProductsByPrice'

export const getPricingCardProducts = ({
  billingInterval,
  products,
  prices,
  loading,
}: {
  billingInterval: BillingInterval
  products?: Product[]
  prices?: Price[]
  loading: boolean
}): PricingCardProduct[] => {
  // filter the prices by the selected billing interval
  const pricesForBillingInterval = prices?.filter(price => price.interval === billingInterval)

  if (!pricesForBillingInterval?.length) {
    return []
  }

  const sortedProducts = sortProductsByPrice({ products, prices: pricesForBillingInterval })

  return sortedProducts.map((product, index) => {
    // get the price for the current billing interval
    const price = pricesForBillingInterval?.filter(price => price.productId === product.id)[0]

    // highlight the second product
    const highlight = index === 1

    const { features, freeTrialDays } = parseProductMetadata(product.metadata)

    const pricingCardProduct: PricingCardProduct = {
      id: price?.id || '',
      title: product.name,
      description: product.description,
      currency: price?.currency || '',
      price: price?.unitAmount / 100 || 0,
      priceInfo: `/ ${price?.interval}` || '',
      features,
      buttonText: freeTrialDays ? `Start ${freeTrialDays}-day free trial` : 'Buy plan',
      highlight,
      loading,
    }

    return pricingCardProduct
  })
}
