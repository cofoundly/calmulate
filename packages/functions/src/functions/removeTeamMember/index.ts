import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Functions, FunctionsMap } from 'types'
import { formatTeamMemberName } from 'utils'

import { getAuthUser } from '@/auth/getAuthUser'
import { sendRemovedFromTeamEmail } from '@/emails/sendRemovedFromTeamEmail'
import { deleteTeamMembers } from '@/teams/deleteTeamMembers'
import { getTeam } from '@/teams/getTeam'
import { getTeamMembers } from '@/teams/getTeamMembers'
import { verifyTeamAdmin } from '@/teams/verifyTeamAdmin'

export const removeTeamMemberFunction = onCall<
  FunctionsMap[Functions.removeTeamMember]['data'],
  Promise<FunctionsMap[Functions.removeTeamMember]['response']>
>(async request => {
  try {
    // Authorized api requests only
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Unauthorized')
    }

    // Get the user from the request
    const user = await getAuthUser(request.auth.uid)

    if (!user) {
      throw new HttpsError('not-found', 'User not found')
    }

    const { teamId, teamMemberId } = request.data

    const adminTeamMember = await verifyTeamAdmin({ teamId, uid: user.uid })

    const team = await getTeam(teamId)

    if (!team) {
      throw new HttpsError('not-found', 'Team not found')
    }

    const teamMembers = await getTeamMembers(teamId)

    if (teamMembers.length === 1) {
      throw new HttpsError('failed-precondition', 'Cannot remove the last team member')
    }

    const teamMember = teamMembers.find(teamMember => teamMember.id === teamMemberId)

    if (!teamMember) {
      throw new HttpsError('not-found', 'Team member not found')
    }

    await deleteTeamMembers([teamMember])

    await sendRemovedFromTeamEmail({
      siteUrl: request.rawRequest.headers.origin || '',
      userEmail: teamMember.email || '',
      userName: formatTeamMemberName(teamMember),
      teamName: team.name,
      adminTeamMemberName: formatTeamMemberName(adminTeamMember),
    })

    return {
      ok: true,
    }
  } catch (error) {
    console.error(error)

    throw new HttpsError('internal', (error as Error).message, error)
  }
})
