import { BillingInterval, Price, PricingType } from 'types'

export const makePrice = ({
  id = '1',
  productId = '1',
  active = true,
  currency = 'USD',
  type = PricingType.Recurring,
  interval = BillingInterval.Month,
  intervalCount = 1,
  trialPeriodDays = 0,
  unitAmount = 100,
  metadata = {},
}: Partial<Price>): Price => ({
  id,
  productId,
  active,
  currency,
  type,
  interval,
  intervalCount,
  trialPeriodDays,
  unitAmount,
  metadata,
})
