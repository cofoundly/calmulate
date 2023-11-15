import { FirestoreCollection, TeamMember, TeamMemberRole, TeamMemberStatus } from 'types'

import { firebase } from '@/firebase/admin'

const parseTeamMemberRole = (role: string): TeamMemberRole => {
  switch (role) {
    case 'admin':
      return TeamMemberRole.Admin
    case 'member':
      return TeamMemberRole.Member
    default:
      return TeamMemberRole.Member
  }
}

const parseTeamMemberStatus = (status: string): TeamMemberStatus => {
  switch (status) {
    case 'active':
      return TeamMemberStatus.Active
    case 'invited':
      return TeamMemberStatus.Invited
    default:
      return TeamMemberStatus.Invited
  }
}

export const updateTeamMembers = async (teamMembers: TeamMember[]) => {
  const teamMembersData = teamMembers.map(teamMember => ({
    ...teamMember,
    role: parseTeamMemberRole(teamMember.role),
    status: parseTeamMemberStatus(teamMember.status),
  }))

  const batch = firebase.firestore().batch()

  for (const teamMember of teamMembersData) {
    const teamMemberRef = firebase
      .firestore()
      .collection(FirestoreCollection.Teams)
      .doc(teamMember.teamId)
      .collection('members')
      .doc(teamMember.id)

    batch.set(teamMemberRef, teamMember, { merge: true })
  }

  await batch.commit()
}
