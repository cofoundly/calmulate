import React, { ComponentProps, ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { PricingCardProduct } from 'types'

import { Columns } from '../columns/Columns'
import { PricingCard } from '../pricingCard/PricingCard'
import { RadioGroup } from '../radioGroup/RadioGroup'

type BillingIntervalOption = ComponentProps<typeof RadioGroup>['options'][0]
type BillingIntervalValue = BillingIntervalOption['value']

type Props = {
  billingInterval: BillingIntervalValue
  billingIntervalOptions: BillingIntervalOption[]
  products: PricingCardProduct[]
  onBillingIntervalClick: (value: BillingIntervalValue) => void
  onProductClick: (productId: PricingCardProduct['id']) => void
} & ComponentPropsWithoutRef<'div'>

export const PricingCards = ({
  className = '',
  billingInterval,
  billingIntervalOptions,
  products,
  onBillingIntervalClick,
  onProductClick,
  ...props
}: Props) => {
  if (!products.length) {
    return null
  }

  return (
    <div className={twMerge('flex flex-col items-center', className)} {...props}>
      {billingIntervalOptions.length && billingIntervalOptions.length > 1 ? (
        <RadioGroup
          className="mb-8"
          value={billingInterval}
          options={billingIntervalOptions}
          onValueChange={option => {
            onBillingIntervalClick(option.value)
          }}
        />
      ) : null}

      <Columns className="w-full overflow-x-auto p-1 pb-6">
        {products?.map(product => {
          return (
            <li key={product.id}>
              <PricingCard
                {...product}
                onClick={() => {
                  onProductClick(product.id)
                }}
              />
            </li>
          )
        })}
      </Columns>
    </div>
  )
}
