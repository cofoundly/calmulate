import { app } from 'config'
import { VerificationEmail } from 'emails'

import { resend } from './resend'

export const sendEmailVerificationEmail = async ({
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
    react: VerificationEmail({ siteUrl, emailVerificationLink }),
  })

  return data
}
