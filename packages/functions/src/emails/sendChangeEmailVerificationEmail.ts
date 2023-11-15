import { app } from 'config'
import { ChangeEmailVerification } from 'emails'

import { resend } from './resend'

export const sendChangeEmailVerificationEmail = async ({
  siteUrl,
  email,
  emailVerificationLink,
}: {
  siteUrl: string
  email: string
  emailVerificationLink: string
}) => {
  const data = await resend.emails.send({
    from: app.emails.transactional,
    to: [email],
    subject: `Verify your email for ${app.name}`,
    react: ChangeEmailVerification({ siteUrl, emailVerificationLink }),
  })

  return data
}
