import { Loading } from 'components'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuthUser } from '@/auth/hooks/useAuthUser'
import { routes } from '@/router/routes'

export const UnauthenticatedLayout = () => {
  const { data: authUser, isLoading, isFetched } = useAuthUser()

  if (isLoading) {
    return <Loading />
  }

  const isAuthenticated = authUser && authUser.emailVerified

  if (isFetched && isAuthenticated) {
    return <Navigate to={routes.dashboard} />
  }

  return <Outlet />
}
