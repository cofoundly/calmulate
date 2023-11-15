import { Loading } from 'components'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuthUser } from '@/auth/hooks/useAuthUser'
import { routes } from '@/router/routes'

export const AuthenticatedLayout = () => {
  const { data: authUser, isLoading, isFetched } = useAuthUser()

  if (isLoading) {
    return <Loading />
  }

  if (isFetched && !authUser) {
    return <Navigate to={routes.signIn} />
  }

  return <Outlet />
}
