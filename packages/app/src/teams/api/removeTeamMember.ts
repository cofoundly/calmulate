import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'

const removeTeamMemberFunction = invokeFunction(Functions.removeTeamMember)

export const removeTeamMember = async ({ teamId, teamMemberId }: { teamId: string; teamMemberId: string }) => {
  const response = await removeTeamMemberFunction({ teamId, teamMemberId })

  return response
}
