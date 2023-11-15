import type { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { BillingInterval, PricingCardProduct } from 'types'

import { PricingCards } from './PricingCards'

const meta = {
  title: 'PricingCards',
  component: PricingCards,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PricingCards>

export default meta

type BillingIntervalOption = ComponentProps<typeof PricingCards>['billingIntervalOptions'][0]
const billingIntervalOptions: BillingIntervalOption[] = [
  {
    value: BillingInterval.Month,
    label: 'Monthly',
  },
  {
    value: BillingInterval.Year,
    label: 'Yearly',
  },
]

const products: PricingCardProduct[] = [
  {
    id: '1',
    title: 'Starter',
    description: 'For small teams',
    currency: 'USD',
    price: 1000,
    priceInfo: `/ ${BillingInterval.Month}`,
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    buttonText: 'Start free trial',
  },
  {
    id: '2',
    title: 'Pro',
    description: 'For medium teams',
    currency: 'USD',
    price: 2000,
    priceInfo: `/ ${BillingInterval.Month}`,
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    highlight: true,
  },
  {
    id: '3',
    title: 'Enterprise',
    description: 'For large teams',
    currency: 'USD',
    price: 3000,
    priceInfo: `/ ${BillingInterval.Month}`,
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  },
]

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    billingInterval: billingIntervalOptions[0].value,
    billingIntervalOptions,
    products,
    onBillingIntervalClick: (value: string) => {
      console.log(value)
    },
    onProductClick: (productId: string) => {
      console.log(productId)
    },
  },
}
