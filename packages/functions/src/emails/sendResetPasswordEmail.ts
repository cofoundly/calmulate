import { app } from 'config'
import { ResetPassword } from 'emails'

import { resend } from './resend'

export const sendResetPasswordEmail = async ({
  siteUrl,
  email,
  link,
}: {
  siteUrl: string
  email: string
  link: string
}) => {
  const data = await resend.emails.send({
    from: app.emails.transactional,
    to: [email],
    subject: `Reset your password for ${app.name}`,
    react: ResetPassword({ siteUrl, link }),
  })

  return data
}
