import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'
import { routes } from '@/router/routes'

const sendEmailVerificationFunction = invokeFunction(Functions.sendEmailVerification)

export const sendEmailVerification = async ({ email }: { email: string }) => {
  await sendEmailVerificationFunction({
    email,
    redirectUrl: `${window.location.origin}${routes.userManagement}?mode=verifyEmail`,
  })
}
