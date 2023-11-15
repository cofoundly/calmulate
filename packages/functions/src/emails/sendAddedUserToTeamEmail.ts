import { app } from 'config'
import { AddedToTeam } from 'emails'

import { resend } from './resend'

export const sendAddedUserToTeamEmail = async ({
  siteUrl,
  userEmail,
  userName,
  teamName,
  adminTeamMemberName,
  buttonUrl,
  buttonText,
}: {
  siteUrl: string
  userEmail: string
  userName: string
  teamName: string
  adminTeamMemberName: string
  buttonUrl: string
  buttonText: string
}) => {
  const data = await resend.emails.send({
    from: app.emails.transactional,
    to: [userEmail],
    subject: `Welcome to the ${teamName} team!`,
    react: AddedToTeam({ siteUrl, userName, teamName, adminTeamMemberName, buttonUrl, buttonText }),
  })

  return data
}
