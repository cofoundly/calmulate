import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Functions, FunctionsMap } from 'types'
import { validateEmail } from 'utils'

import { getAuthUserByEmail } from '@/auth/getAuthUserByEmail'
import { sendEmailAddressChangedEmail } from '@/emails/sendEmailAddressChangedEmail'
import { updateUser } from '@/users/updateUser'

export const changeUserEmailFunction = onCall<
  FunctionsMap[Functions.changeUserEmail]['data'],
  Promise<FunctionsMap[Functions.changeUserEmail]['response']>
>(async request => {
  try {
    const { oldEmail, newEmail } = request.data

    // validate the emails
    if (!validateEmail(oldEmail)) {
      throw new HttpsError('invalid-argument', 'Invalid oldEmail')
    }

    if (!validateEmail(newEmail)) {
      throw new HttpsError('invalid-argument', 'Invalid newEmail')
    }

    // check if the user and email exists (they may not be authenticated by this stage)
    const authUser = await getAuthUserByEmail(oldEmail)

    if (!authUser) {
      throw new HttpsError('not-found', 'User not found')
    }

    // update the user data with the new email
    await updateUser(authUser.uid, {
      email: newEmail,
    })

    // send them an email
    await sendEmailAddressChangedEmail({
      siteUrl: request.rawRequest.headers.origin || '',
      oldEmail,
      newEmail,
    })

    return {
      ok: true,
    }
  } catch (error) {
    console.error(error)

    throw new HttpsError('internal', (error as Error).message, error)
  }
})
