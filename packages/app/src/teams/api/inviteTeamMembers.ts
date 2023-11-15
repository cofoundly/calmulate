import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'

const inviteTeamMembersFunction = invokeFunction(Functions.inviteTeamMembers)

export const inviteTeamMembers = async ({
  teamId,
  emails,
  signUpUrl,
}: {
  teamId: string
  emails: string[]
  signUpUrl: string
}) => {
  const response = await inviteTeamMembersFunction({ teamId, emails, signUpUrl })

  return response
}
