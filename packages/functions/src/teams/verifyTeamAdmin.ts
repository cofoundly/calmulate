import { HttpsError } from 'firebase-functions/v2/https'

import { getTeamMember } from './getTeamMember'

export const verifyTeamAdmin = async ({ teamId, uid }: { teamId: string; uid: string }) => {
  // Verify that the logged in user is an admin of the team
  const adminTeamMember = await getTeamMember({ teamId, teamMemberId: uid })

  if (!adminTeamMember || adminTeamMember.role !== 'admin') {
    throw new HttpsError('permission-denied', 'You need to be a team admin to invite or remove team members.')
  }

  return adminTeamMember
}
