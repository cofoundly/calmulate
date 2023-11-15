import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'
import { routes } from '@/router/routes'

import { signOut } from './signOut'

const requestResetPasswordFunction = invokeFunction(Functions.requestResetPassword)

export const requestResetPassword = async ({ email, newPassword }: { email: string; newPassword: string }) => {
  await requestResetPasswordFunction({
    email,
    newPassword,
    redirectUrl: `${window.location.origin}${routes.userManagement}?mode=resetPassword&newPassword=${newPassword}`,
  })

  // sign the user out so that our auth flow works correctly
  await signOut()
}
