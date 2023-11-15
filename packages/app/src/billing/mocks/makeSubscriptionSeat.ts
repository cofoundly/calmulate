import { SubscriptionSeat } from 'types'

export const makeSubscriptionSeat = ({
  id = '1',
  createdAt = '2020-01-01T00:00:00.000Z',
  subscriptionId = '1',
  userId = '1',
  email = '',
  isSubscriptionOwner = false,
}: Partial<SubscriptionSeat>): SubscriptionSeat => ({
  id,
  createdAt,
  subscriptionId,
  userId,
  email,
  isSubscriptionOwner,
})
