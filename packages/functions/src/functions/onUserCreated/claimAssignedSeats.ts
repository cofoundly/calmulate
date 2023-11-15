import { TeamMemberStatus } from 'types'

import { deleteSubscriptionSeats } from '@/billing/deleteSubscriptionSeats'
import { getUnclaimedSubscriptionSeats } from '@/billing/getUnclaimedSubscriptionSeats'
import { updateSubscriptionSeats } from '@/billing/updateSubscriptionSeats'
import { deleteTeamMembers } from '@/teams/deleteTeamMembers'
import { getUnclaimedTeamMembers } from '@/teams/getUnclaimedTeamMembers'
import { updateTeamMembers } from '@/teams/updateTeamMembers'

export const claimAssignedSeats = async ({
  uid,
  email,
  firstName,
  lastName,
}: {
  uid: string
  email: string
  firstName: string
  lastName: string
}) => {
  // claim any subscription seats where the uid is null and the email matches the new user's email
  const subscriptionSeats = await getUnclaimedSubscriptionSeats(email)

  if (!subscriptionSeats.length) {
    return
  }

  // the subscription seat docs were created using a doc id but we need the doc id to be the new user id
  // therefore we delete the old subscription seat docs and create new ones with the new user id
  const newSubscriptionSeats = subscriptionSeats.map(seat => ({
    ...seat,
    id: uid,
    userId: uid,
  }))

  // create the new subscription seats
  await updateSubscriptionSeats(newSubscriptionSeats)

  // delete the old subscription seats
  await deleteSubscriptionSeats(subscriptionSeats)

  // claim any team members where the uid is null and the email matches the new user email
  const teamMembers = await getUnclaimedTeamMembers(email)

  // the team member docs were created using a doc id but we need the doc id to be the new user id
  // therefore we delete the old member docs and create new ones with the new user id
  const newTeamMembers = teamMembers.map(member => ({
    ...member,
    id: uid,
    userId: uid,
    status: TeamMemberStatus.Active,
    firstName,
    lastName,
  }))

  // create the new team members
  await updateTeamMembers(newTeamMembers)

  // delete the old team members
  await deleteTeamMembers(teamMembers)
}
