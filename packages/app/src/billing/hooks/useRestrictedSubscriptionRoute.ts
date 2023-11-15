import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '@/router/routes'

import { useHasActiveSubscription } from './useHasActiveSubscription'

export const useRestrictedSubscriptionRoute = () => {
  const { data: hasActiveSubscription, isLoading, ...query } = useHasActiveSubscription()
  const navigate = useNavigate()

  // only users with active subscriptions can access restricted pages
  useEffect(() => {
    if (!isLoading && !hasActiveSubscription) {
      navigate(routes.settingsSubscription)
    }
  }, [hasActiveSubscription, navigate, isLoading])

  return {
    ...query,
    data: hasActiveSubscription,
    isLoading,
  }
}
