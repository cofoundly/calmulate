import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Functions, FunctionsMap } from 'types'
import { validateEmail } from 'utils'

import { generateResetPasswordLink } from '@/auth/generateResetPasswordLink'
import { getAuthUserByEmail } from '@/auth/getAuthUserByEmail'
import { sendResetPasswordEmail } from '@/emails/sendResetPasswordEmail'

export const requestResetPasswordFunction = onCall<
  FunctionsMap[Functions.requestResetPassword]['data'],
  Promise<FunctionsMap[Functions.requestResetPassword]['response']>
>(async request => {
  try {
    const { email, newPassword, redirectUrl } = request.data

    // validate email
    if (!validateEmail(email)) {
      throw new HttpsError('invalid-argument', 'Invalid email')
    }

    const authUser = await getAuthUserByEmail(email)

    if (!authUser) {
      throw new HttpsError('not-found', 'User not found')
    }

    // create the email verification link
    const link = await generateResetPasswordLink({ email, newPassword, redirectUrl })

    // send the reset password email
    await sendResetPasswordEmail({
      siteUrl: request.rawRequest.headers.origin || '',
      email,
      link,
    })

    return {
      ok: true,
    }
  } catch (error) {
    console.error(error)

    throw new HttpsError('internal', (error as Error).message, error)
  }
})
