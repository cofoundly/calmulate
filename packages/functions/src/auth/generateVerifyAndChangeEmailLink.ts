import { ActionCodeSettings } from 'firebase-admin/auth'

import { firebase } from '@/firebase/admin'

export const generateVerifyAndChangeEmailLink = async ({
  oldEmail,
  newEmail,
  redirectUrl,
}: {
  oldEmail: string
  newEmail: string
  redirectUrl: string
}) => {
  const actionCodeSettings: ActionCodeSettings = {
    url: redirectUrl,
  }
  const link = await firebase.auth().generateVerifyAndChangeEmailLink(oldEmail, newEmail, actionCodeSettings)

  // we need to append oldEmail and newEmail manually because firebase does not do it for us
  return `${link}&oldEmail=${encodeURIComponent(oldEmail)}&newEmail=${encodeURIComponent(newEmail)}`
}
