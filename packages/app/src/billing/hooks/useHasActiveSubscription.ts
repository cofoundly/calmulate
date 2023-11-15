import { SubscriptionStatus } from 'types'

import { useSubscriptionInfo } from './useSubscriptionInfo'

export const useHasActiveSubscription = () => {
  const { data: subscriptionInfo, ...query } = useSubscriptionInfo()

  const hasActiveSubscription =
    subscriptionInfo?.status === SubscriptionStatus.Active || subscriptionInfo?.status === SubscriptionStatus.Trialing

  return {
    ...query,
    data: hasActiveSubscription,

    // for the loading state we use isFetching because the query may not be enabled yet if the user is not logged in
    isLoading: query.isFetching,
  }
}
