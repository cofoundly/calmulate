import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from 'components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '@/components/authLayout/AuthLayout'
import { ResetPassword } from '@/components/resetPassword/ResetPassword'
import { routes } from '@/router/routes'

export const ForgotPassword = () => {
  const navigate = useNavigate()

  return (
    <AuthLayout title="Forgot your password?">
      <ResetPassword />

      <Button
        icon={<ArrowLeftIcon />}
        variant="light"
        onClick={() => {
          navigate(routes.signIn)
        }}
      >
        Back to sign in
      </Button>
    </AuthLayout>
  )
}
