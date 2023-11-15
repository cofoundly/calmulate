import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/billing/api/getProducts'
import { QueryKeys } from '@/types'

export const useProducts = () => {
  return useQuery({ queryKey: [QueryKeys.Products], queryFn: getProducts })
}
