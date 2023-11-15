import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@/types'

import { getPrices } from '../api/getPrices'

export const usePrices = () => {
  return useQuery({ queryKey: [QueryKeys.Prices], queryFn: getPrices })
}
