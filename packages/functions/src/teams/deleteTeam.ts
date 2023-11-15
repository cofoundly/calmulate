import { FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'

import { deleteTeamMembersForTeam } from './deleteTeamMembersForTeam'

export const deleteTeam = async (teamId: string) => {
  // First delete the team members
  await deleteTeamMembersForTeam(teamId)

  // Then delete the team
  await firebase.firestore().collection(FirestoreCollection.Teams).doc(teamId.toString()).delete()
}
