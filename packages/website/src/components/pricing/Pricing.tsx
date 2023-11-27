'use client'

import { Columns, PricingCard } from 'components'
import React, { ComponentProps } from 'react'

import { usePrimaryActionClick } from '@/actions/hooks/usePrimaryActionClick'
import { AnalyticsPrimaryButtonName } from '@/analytics/models'

import { Section, SectionProps } from '../section/Section'

type Props = {
  prices?: Omit<ComponentProps<typeof PricingCard>, 'id' | 'onClick'>[]
} & SectionProps

export const Pricing = ({ prices, ...sectionProps }: Props) => {
  const onPrimaryActionClick = usePrimaryActionClick()

  return (
    <Section {...sectionProps}>
      <div className="mt-12 lg:mt-24">
        <Columns className="p-1 pb-6">
          {prices?.length
            ? prices.map(priceInfo => (
                <li key={priceInfo.title}>
                  <PricingCard
                    {...priceInfo}
                    id={priceInfo.title} // satisfy TS
                    onClick={() => {
                      onPrimaryActionClick({
                        buttonName: AnalyticsPrimaryButtonName.Pricing,
                      })
                    }}
                  />
                </li>
              ))
            : null}
        </Columns>
      </div>
    </Section>
  )
}
