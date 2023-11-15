import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Functions, FunctionsMap } from 'types'
import { validateEmail } from 'utils'

import { generateEmailVerificationLink } from '@/auth/generateEmailVerificationLink'
import { getAuthUser } from '@/auth/getAuthUser'
import { getAuthUserByEmail } from '@/auth/getAuthUserByEmail'
import { sendEmailVerificationEmail } from '@/emails/sendEmailVerificationEmail'

export const sendEmailVerificationFunction = onCall<
  FunctionsMap[Functions.sendEmailVerification]['data'],
  Promise<FunctionsMap[Functions.sendEmailVerification]['response']>
>(async request => {
  try {
    // Authorized api requests only
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Unauthorized')
    }

    const { email, redirectUrl } = request.data

    // validate email
    if (!validateEmail(email)) {
      throw new HttpsError('invalid-argument', 'Invalid email')
    }

    // check if the user and email exists (they may not be authenticated by this stage)
    // e.g. when a new user signs up, they are not authenticated by this stage
    // but if an existing user is changing their email, they are authenticated
    const authUser = (await getAuthUser(request.auth.uid)) || (await getAuthUserByEmail(email))

    if (!authUser) {
      throw new HttpsError('not-found', 'User not found')
    }

    // create the email verification link
    const emailVerificationLink = await generateEmailVerificationLink({ email, redirectUrl })

    // send the verification email
    await sendEmailVerificationEmail({
      siteUrl: request.rawRequest.headers.origin || '',
      email,
      emailVerificationLink,
    })

    return {
      ok: true,
    }
  } catch (error) {
    console.error(error)

    throw new HttpsError('internal', (error as Error).message, error)
  }
})
