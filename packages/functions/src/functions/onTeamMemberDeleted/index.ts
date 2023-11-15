import { onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { HttpsError } from 'firebase-functions/v2/https'
import { TeamMember } from 'types'

import { deleteAssignedSubscriptionSeatsByEmail } from '@/billing/deleteAssignedSubscriptionSeatsByEmail'
import { getSubscriptionSeats } from '@/billing/getSubscriptionSeats'
import { getTeamMembersForUserEmail } from '@/teams/getTeamMembersForUserEmail'

export const onTeamMemberDeleted = onDocumentDeleted('teams/{teamsId}/members/{memberId}', async event => {
  try {
    const teamMember = event.data?.data() as TeamMember | undefined

    if (!teamMember) {
      throw new HttpsError('not-found', 'Team member not found')
    }

    const usersTeamMembers = await getTeamMembersForUserEmail(teamMember.email)

    // this is the last team the user was removed from when there are no more other team members with the same email
    const isLastTeam = !usersTeamMembers.length

    // we should only delete a user's subscription seat if this is the last team the user is a member of
    if (!isLastTeam) {
      return
    }

    // get the subscription seats for the admin that added this team member
    const invitersSubscriptionSeats = await getSubscriptionSeats(teamMember.invitedBy)

    // NOTE: this assumes that the user only has one subscription
    const subscriptionId = invitersSubscriptionSeats[0].subscriptionId

    // if a user has not signed up yet, userId will be null so we need to use email
    await deleteAssignedSubscriptionSeatsByEmail({
      subscriptionId,
      email: teamMember.email,
    })
  } catch (error) {
    console.error(error)

    throw error
  }
})
