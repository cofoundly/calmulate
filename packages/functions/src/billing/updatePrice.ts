import { BillingInterval, FirestoreCollection, Price, PricingType } from 'types'

import { firebase } from '@/firebase/admin'

import { Stripe } from './stripe'

const parsePriceType = (priceType: string): PricingType => {
  switch (priceType) {
    case 'recurring':
      return PricingType.Recurring
    case 'one_time':
      return PricingType.OneTime
    default:
      return PricingType.Recurring
  }
}

const parsePricingPlanInterval = (pricingPlanInterval: string): BillingInterval => {
  switch (pricingPlanInterval) {
    case 'day':
      return BillingInterval.Day
    case 'week':
      return BillingInterval.Week
    case 'month':
      return BillingInterval.Month
    case 'year':
      return BillingInterval.Year
    default:
      return BillingInterval.Month
  }
}

export const updatePrice = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    productId: price.product as string,
    active: price.active,
    currency: price.currency,
    type: parsePriceType(price.type),
    interval: parsePricingPlanInterval(price.recurring?.interval || 'month'),
    intervalCount: price.recurring?.interval_count || 1,
    trialPeriodDays: price.recurring?.trial_period_days || 0,
    unitAmount: price.unit_amount || 0,
    metadata: price.metadata,
  }

  await firebase.firestore().collection(FirestoreCollection.Prices).doc(price.id).set(priceData)
}
