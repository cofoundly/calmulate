import { SubscriptionInfo, SubscriptionStatus } from 'types'

export const makeSubscriptionInfo = ({
  id = '1',
  priceId = '1',
  status = SubscriptionStatus.Active,
  totalSeats = 1,
  assignedSeats = 1,
  availableSeats = 0,
}: Partial<SubscriptionInfo>): SubscriptionInfo => ({
  id,
  priceId,
  status,
  totalSeats,
  assignedSeats,
  availableSeats,
})
