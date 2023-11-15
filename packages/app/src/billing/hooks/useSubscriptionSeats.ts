import { useQuery } from '@tanstack/react-query'

import { useAuthUser } from '@/auth/hooks/useAuthUser'
import { QueryKeys } from '@/types'

import { getSubscriptionSeatsForUser } from '../api/getSubscriptionSeatsForUser'

export const useSubscriptionSeats = () => {
  const { data: user } = useAuthUser()

  const userId = user?.uid

  const query = useQuery({
    queryKey: [QueryKeys.SubscriptionSeats],
    queryFn: () => (userId ? getSubscriptionSeatsForUser(userId) : undefined),
    enabled: Boolean(userId),
  })

  return {
    ...query,

    // for the loading state we use isFetching because the query may not be enabled yet if the user is not logged in
    isLoading: query.isFetching,
  }
}
