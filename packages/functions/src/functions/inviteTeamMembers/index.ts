import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Functions, FunctionsMap, SubscriptionStatus, TeamMember, TeamMemberRole, TeamMemberStatus } from 'types'
import { formatTeamMemberName, getISOString } from 'utils'

import { getAuthUser } from '@/auth/getAuthUser'
import { getSubscriptionInfo } from '@/billing/getSubscriptionInfo'
import { getSubscriptionSeats } from '@/billing/getSubscriptionSeats'
import { sendAddedUserToTeamEmail } from '@/emails/sendAddedUserToTeamEmail'
import { getTeam } from '@/teams/getTeam'
import { getTeamMembers } from '@/teams/getTeamMembers'
import { updateTeamMembers } from '@/teams/updateTeamMembers'
import { verifyTeamAdmin } from '@/teams/verifyTeamAdmin'
import { getUsersByEmails } from '@/users/getUsersByEmails'
import { getUuid } from '@/utils/getUuid/getUuid'

export const inviteTeamMembersFunction = onCall<
  FunctionsMap[Functions.inviteTeamMembers]['data'],
  Promise<FunctionsMap[Functions.inviteTeamMembers]['response']>
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

    const { teamId, emails, signUpUrl } = request.data

    const adminTeamMember = await verifyTeamAdmin({ teamId, uid: user.uid })

    const team = await getTeam(teamId)

    if (!team) {
      throw new HttpsError('not-found', 'Team not found')
    }

    const teamMembers = await getTeamMembers(teamId)

    // Filter out the emails that don't already belong to the team
    const newTeamMemberEmails = (emails as string[]).filter(
      email => !teamMembers.find(teamMember => teamMember.email === email),
    )

    const subscriptionSeats = await getSubscriptionSeats(user.uid)

    const subscriptionId = subscriptionSeats[0].subscriptionId // NOTE: this assumes that the user only has one subscription
    const subscriptionInfo = await getSubscriptionInfo(subscriptionId)

    if (!subscriptionInfo) {
      throw new HttpsError('not-found', 'Subscription info not found')
    }

    if (
      subscriptionInfo?.status !== SubscriptionStatus.Active &&
      subscriptionInfo?.status !== SubscriptionStatus.Trialing
    ) {
      throw new HttpsError('failed-precondition', 'You need an active subscription to invite team members')
    }

    if (subscriptionInfo.availableSeats < newTeamMemberEmails.length) {
      throw new HttpsError(
        'failed-precondition',
        `You don't have enough seats to invite ${newTeamMemberEmails.length} new members`,
      )
    }

    // If any of the emails, have a user account, we send them an email saying they have been added to the team
    // otherwise, we send them an email with a link to sign up
    const existingUsers = await getUsersByEmails(newTeamMemberEmails)

    const newTeamMembers: TeamMember[] = newTeamMemberEmails.map(email => {
      const existingUser = existingUsers.find(existingUser => existingUser.email === email)
      const userId = existingUser?.id
      const teamMember: TeamMember = {
        id: userId || getUuid(),
        createdAt: getISOString(),
        teamId: team.id,
        userId: userId || null, // this will be updated by a function when new users sign up
        role: TeamMemberRole.Member,
        status: existingUser ? TeamMemberStatus.Active : TeamMemberStatus.Invited,
        firstName: existingUser?.firstName || null,
        lastName: existingUser?.lastName || null,
        email,
        invitedBy: user.uid,
      }

      return teamMember
    })

    // Add all the team members to the team
    await updateTeamMembers(newTeamMembers)

    // notify the users via email that they have been added to the team
    const promises = newTeamMembers.map(teamMember => {
      const siteUrl = request.rawRequest.headers.origin || ''
      const isNewUser = !teamMember.userId

      return sendAddedUserToTeamEmail({
        siteUrl,
        userEmail: teamMember.email,
        userName: formatTeamMemberName(teamMember),
        teamName: team.name,
        adminTeamMemberName: formatTeamMemberName(adminTeamMember),
        buttonUrl: isNewUser ? signUpUrl : siteUrl,
        buttonText: isNewUser ? 'Sign up' : 'Go to dashboard',
      })
    })

    await Promise.all(promises)

    return {
      ok: true,
    }
  } catch (error) {
    console.error(error)

    throw new HttpsError('internal', (error as Error).message, error)
  }
})
