import { BillingInterval } from 'types'

export const parseBillingInterval = (billingInterval: string): BillingInterval => {
  switch (billingInterval) {
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
