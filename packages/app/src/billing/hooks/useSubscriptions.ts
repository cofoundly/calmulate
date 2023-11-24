import { useQuery } from '@tanstack/react-query'

import { useAuthUser } from '@/auth/hooks/useAuthUser'
import { features } from '@/features'
import { QueryKeys } from '@/types'

import { getSubscriptionsForUser } from '../api/getSubscriptionsForUser'

export const useSubscriptions = () => {
  const { data: user } = useAuthUser()

  const userId = user?.uid

  const query = useQuery({
    queryKey: [QueryKeys.Subscriptions],
    queryFn: () => (userId ? getSubscriptionsForUser(userId) : undefined),
    enabled: Boolean(features.subscriptions && userId),
  })

  return {
    ...query,

    // for the loading state we use isFetching because the query may not be enabled yet if the user is not logged in
    isLoading: query.isFetching,
  }
}
