import { Loading } from 'components'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useResetPassword } from '@/auth/hooks/useResetPassword'
import { routes } from '@/router/routes'
import { UserManagementParams } from '@/types'

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()

  const { mutate: resetPassword } = useResetPassword()
  const navigate = useNavigate()

  const actionCode = searchParams.get(UserManagementParams.ActionCode)
  const newPassword = searchParams.get(UserManagementParams.NewPassword)

  useEffect(() => {
    async function doAsync() {
      if (
        !actionCode &&
        // in development, we don't have an action code
        // because firebase automatically changes the password when the email action link is clicked
        import.meta.env.MODE !== 'development'
      ) {
        throw new Error('Action code is missing')
      }

      if (!newPassword) {
        throw new Error('New password is missing')
      }

      // in development, we don't have an action code because Firebase automatically changes the password when the email action link is clicked
      if (actionCode) {
        await resetPassword({ actionCode, newPassword })
      }

      toast.success('Password changed successfully. Please sign in to continue.')

      // navigate to the sign in page
      navigate(routes.signIn, {
        replace: true,
      })
    }

    // NOTE: in development, this runs twice because React.StrictMode mounts the app twice
    doAsync()
  }, [actionCode, navigate, newPassword, resetPassword])

  return <Loading />
}
