import { doc, updateDoc } from 'firebase/firestore'
import { FirestoreCollection, TeamMemberRole } from 'types'

import { db } from '@/firebase'

export const updateTeamMemberRole = async ({
  teamId,
  teamMemberId,
  role,
}: {
  teamId: string
  teamMemberId: string
  role: TeamMemberRole
}) => {
  const ref = doc(db, FirestoreCollection.Teams, teamId, FirestoreCollection.TeamMembers, teamMemberId)

  await updateDoc(ref, { role })
}
