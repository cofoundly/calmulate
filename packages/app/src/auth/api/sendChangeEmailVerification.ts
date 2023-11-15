import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'
import { routes } from '@/router/routes'

const sendChangeEmailVerificationFunction = invokeFunction(Functions.sendChangeEmailVerification)

export const sendChangeEmailVerification = async ({ oldEmail, newEmail }: { oldEmail: string; newEmail: string }) => {
  await sendChangeEmailVerificationFunction({
    oldEmail,
    newEmail,
    redirectUrl: `${window.location.origin}${routes.userManagement}`,
  })
}
