import { useQuery } from '@tanstack/react-query'

import { features } from '@/features'
import { QueryKeys } from '@/types'

import { getPrices } from '../api/getPrices'

export const usePrices = () => {
  return useQuery({
    queryKey: [QueryKeys.Prices],
    queryFn: getPrices,
    enabled: features.subscriptions,
  })
}
