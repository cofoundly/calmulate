import { ActionCodeSettings } from 'firebase-admin/auth'

import { firebase } from '@/firebase/admin'

export const generateResetPasswordLink = async ({
  email,
  newPassword,
  redirectUrl,
}: {
  email: string
  newPassword: string
  redirectUrl: string
}) => {
  const actionCodeSettings: ActionCodeSettings = {
    url: redirectUrl,
  }
  const link = await firebase.auth().generatePasswordResetLink(email, actionCodeSettings)

  return `${link}&newPassword=${newPassword}`
}
