import { useQuery } from '@tanstack/react-query'

import { features } from '@/features'
import { QueryKeys } from '@/types'

import { getAuthUser } from '../api/getAuthUser'

export const useAuthUser = () => {
  return useQuery({
    queryKey: [QueryKeys.AuthUser],
    queryFn: getAuthUser,
    enabled: features.auth,
  })
}
