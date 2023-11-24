import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/billing/api/getProducts'
import { features } from '@/features'
import { QueryKeys } from '@/types'

export const useProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.Products],
    queryFn: getProducts,
    enabled: features.subscriptions,
  })
}
