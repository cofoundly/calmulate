import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '@/router/routes'

import { useHasTeamPlan } from './useHasTeamPlan'

export const useRestrictedTeamPlanRoute = () => {
  const { data: hasTeamPlan, isLoading, ...query } = useHasTeamPlan()
  const navigate = useNavigate()

  // only users with a team plan can access restricted pages
  useEffect(() => {
    if (!isLoading && !hasTeamPlan) {
      navigate(routes.settingsSubscription)
    }
  }, [hasTeamPlan, isLoading, navigate])

  return {
    ...query,
    data: hasTeamPlan,
    isLoading,
  }
}
