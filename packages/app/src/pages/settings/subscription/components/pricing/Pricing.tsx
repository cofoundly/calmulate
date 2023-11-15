import { PricingCards, SmallText, TitleText } from 'components'
import React, { ComponentProps, useEffect, useMemo, useState } from 'react'
import { BillingInterval } from 'types'
import { formatBillingInterval, getPricingCardProducts, parseBillingInterval } from 'utils'

import { useCreateCheckoutSession } from '@/billing/hooks/useCreateCheckoutSession'
import { usePrices } from '@/billing/hooks/usePrices'
import { useProducts } from '@/billing/hooks/useProducts'

import { ProductsNotFound } from './productsNotFound/ProductsNotFound'

const DEFAULT_QUANTITY = 1

type BillingIntervalOption = ComponentProps<typeof PricingCards>['billingIntervalOptions'][0]

export const Pricing = () => {
  const { data: products } = useProducts()
  const { data: prices } = usePrices()

  // Note: we set the billingInterval in a useEffect when the prices updates
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(BillingInterval.Month)
  const [billingIntervalOptions, setBillingIntervalOptions] = useState<BillingIntervalOption[]>([])

  const { mutate: createCheckoutSession, isLoading: createCheckoutSessionLoading } = useCreateCheckoutSession()

  const pricingCardsProducts = useMemo(
    () => getPricingCardProducts({ billingInterval, products, prices, loading: createCheckoutSessionLoading }),
    [billingInterval, createCheckoutSessionLoading, prices, products],
  )

  useEffect(() => {
    // when the prices update, set the selected billing interval and billing interval options
    if (prices?.length) {
      // get the unique billing intervals from the prices
      const billingIntervalOptions = [...new Set(prices?.map(price => price.interval))].map(billingInterval => ({
        label: formatBillingInterval(billingInterval),
        value: billingInterval,
      }))

      setBillingIntervalOptions(billingIntervalOptions)

      // set the selected billing interval to the first one
      setBillingInterval(billingIntervalOptions[0].value)
    }
  }, [prices])

  if (!products?.length || !prices?.length) {
    return <ProductsNotFound />
  }

  return (
    <main className="flex flex-col items-center">
      <div className="mb-8 w-full max-w-lg text-center">
        <TitleText className="my-4">Pricing plans for teams of all sizes</TitleText>

        <SmallText>
          Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating
          customer loyalty, and driving sales.
        </SmallText>
      </div>

      <PricingCards
        billingInterval={billingInterval}
        billingIntervalOptions={billingIntervalOptions}
        products={pricingCardsProducts}
        onBillingIntervalClick={newBillingIntervalValue => {
          setBillingInterval(parseBillingInterval(newBillingIntervalValue))
        }}
        onProductClick={id => {
          createCheckoutSession({ priceId: id, quantity: DEFAULT_QUANTITY })
        }}
      />
    </main>
  )
}
