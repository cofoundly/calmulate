import { FirestoreCollection, TeamMember } from 'types'

import { firebase } from '@/firebase/admin'

export const getTeamMember = async ({ teamId, teamMemberId }: { teamId: string; teamMemberId: string }) => {
  const doc = await firebase
    .firestore()
    .collection(FirestoreCollection.Teams)
    .doc(teamId)
    .collection(FirestoreCollection.TeamMembers)
    .doc(teamMemberId)
    .get()

  return doc.data() as TeamMember | undefined
}
