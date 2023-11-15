import { app } from 'config'
import { EmailAddressChanged } from 'emails'

import { resend } from './resend'

export const sendEmailAddressChangedEmail = async ({
  siteUrl,
  oldEmail,
  newEmail,
}: {
  siteUrl: string
  oldEmail: string
  newEmail: string
}) => {
  const data = await resend.emails.send({
    from: app.emails.transactional,
    to: [newEmail],
    subject: `Email address changed`,
    react: EmailAddressChanged({ siteUrl, oldEmail, newEmail }),
  })

  return data
}
