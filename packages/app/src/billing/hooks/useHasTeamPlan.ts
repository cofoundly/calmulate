import { usePrices } from './usePrices'
import { useProducts } from './useProducts'
import { useSubscriptionInfo } from './useSubscriptionInfo'

export const useHasTeamPlan = () => {
  const { data: subscriptionInfo, isLoading: subscriptionInfoLoading, ...query } = useSubscriptionInfo()
  const { data: prices, isLoading: pricesLoading } = usePrices()
  const { data: products, isLoading: productsLoading } = useProducts()

  const activePrice = prices?.find(
    price =>
      price.id ===
      // NOTE: we assume the user can only have one subscription here
      subscriptionInfo?.priceId,
  )
  const activeProduct = products?.find(product => product.id === activePrice?.productId)
  const hasTeamPlan = Boolean(activeProduct?.metadata?.teamPlan)
  const isLoading = subscriptionInfoLoading || pricesLoading || productsLoading

  return {
    ...query,
    data: hasTeamPlan,
    isLoading,
  }
}
