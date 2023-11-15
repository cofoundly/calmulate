import { SubscriptionStatus } from 'types'

export const formatSubscriptionStatus = (status: SubscriptionStatus): string => {
  switch (status) {
    case SubscriptionStatus.Trialing:
      return 'Trial'
    case SubscriptionStatus.Active:
      return 'Active'
    case SubscriptionStatus.PastDue:
      return 'Past due'
    case SubscriptionStatus.Cancelled:
      return 'Cancelled'
    case SubscriptionStatus.Unpaid:
      return 'Unpaid'
    default:
      return ''
  }
}
