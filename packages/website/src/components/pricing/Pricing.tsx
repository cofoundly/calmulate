'use client'

import { PricingCards } from 'components'
import React, { ComponentProps, useEffect, useMemo, useState } from 'react'
import { BillingInterval, Price, Product } from 'types'
import { formatBillingInterval, getPricingCardProducts, parseBillingInterval } from 'utils'

import { useCreateCheckoutSession } from '@/billing/hooks/useCreateCheckoutSession'
import constants from '@/constants.json'
import { SectionId } from '@/routes'

import { Section } from '../section/Section'

const DEFAULT_QUANTITY = 1

type BillingIntervalOption = ComponentProps<typeof PricingCards>['billingIntervalOptions'][0]

type Props = {
  products: Product[]
  prices: Price[]
}

export const Pricing = ({ products, prices }: Props) => {
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

  return (
    <Section
      id={SectionId.Pricing}
      variant="inverted"
      title={constants.pricing.title}
      highlighted={constants.pricing.highlighted}
    >
      <PricingCards
        billingInterval={billingInterval}
        billingIntervalOptions={billingIntervalOptions}
        products={pricingCardsProducts}
        onBillingIntervalClick={newBillingIntervalValue => {
          setBillingInterval(parseBillingInterval(newBillingIntervalValue))
        }}
        onProductClick={id => {
          createCheckoutSession({
            priceId: id,
            quantity: DEFAULT_QUANTITY,
          })
        }}
      />
    </Section>
  )
}
