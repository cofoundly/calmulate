import { useQuery } from '@tanstack/react-query'

import { useAuthUser } from '@/auth/hooks/useAuthUser'
import { features } from '@/features'
import { QueryKeys } from '@/types'

import { getUser } from '../api/getUser'

export const useUser = () => {
  const { data: authUser } = useAuthUser()

  const userId = authUser?.uid

  const query = useQuery({
    queryKey: [QueryKeys.User],
    queryFn: () => (userId ? getUser(userId) : undefined),
    enabled: Boolean(features.auth && userId),
  })

  return {
    ...query,

    // for the loading state we use isFetching because the query may not be enabled yet if the authUser is not logged in
    isLoading: query.isFetching,
  }
}
