import { Loading } from 'components'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { routes } from '@/router/routes'
import { useIsLoggedInUserTeamAdmin } from '@/teams/hooks/useIsLoggedInUserTeamAdmin'

export const TeamAdminLayout = () => {
  const { data: isTeamAdmin, isLoading, isFetched } = useIsLoggedInUserTeamAdmin()

  if (isLoading) {
    return <Loading />
  }

  if (isFetched && !isTeamAdmin) {
    return <Navigate to={routes.dashboard} />
  }

  return <Outlet />
}
