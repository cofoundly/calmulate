import { app } from 'config'
import { TeamDeleted } from 'emails'

import { resend } from './resend'

export const sendTeamDeletedEmail = async ({
  siteUrl,
  userEmail,
  userName,
  teamName,
  adminTeamMemberName,
}: {
  siteUrl: string
  userEmail: string
  userName: string
  teamName: string
  adminTeamMemberName: string
}) => {
  const data = await resend.emails.send({
    from: app.emails.transactional,
    to: [userEmail],
    subject: `The ${teamName} team has been deleted.`,
    react: TeamDeleted({ siteUrl, userName, teamName, adminTeamMemberName }),
  })

  return data
}
