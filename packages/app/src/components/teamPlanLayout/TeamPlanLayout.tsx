import { Loading } from 'components'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useHasTeamPlan } from '@/billing/hooks/useHasTeamPlan'
import { routes } from '@/router/routes'

export const TeamPlanLayout = () => {
  const { data: hasTeamPlan, isLoading, isFetched } = useHasTeamPlan()

  if (isLoading) {
    return <Loading />
  }

  if (isFetched && !hasTeamPlan) {
    return <Navigate to={routes.dashboard} />
  }

  return <Outlet />
}
