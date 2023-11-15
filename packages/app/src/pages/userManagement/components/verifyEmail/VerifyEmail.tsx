import { Loading } from 'components'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useVerifyEmail } from '@/auth/hooks/useVerifyEmail'
import { routes } from '@/router/routes'
import { UserManagementParams } from '@/types'

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams()

  const { mutate: verifyEmail } = useVerifyEmail()
  const navigate = useNavigate()

  const actionCode = searchParams.get(UserManagementParams.ActionCode)

  useEffect(() => {
    async function doAsync() {
      await verifyEmail(actionCode)

      toast.success('Email verified successfully. Please sign in to continue.')

      // navigate to the sign in page
      navigate(routes.signIn, {
        replace: true,
      })
    }

    // NOTE: in development, this runs twice because React.StrictMode mounts the app twice
    doAsync()
  }, [actionCode, navigate, verifyEmail])

  return <Loading />
}
