import { FirestoreCollection, TeamMember, TeamMemberStatus } from 'types'

import { firebase } from '@/firebase/admin'

export const getUnclaimedTeamMembers = async (email: string) => {
  const docs = await firebase
    .firestore()
    .collectionGroup(FirestoreCollection.TeamMembers)
    .where('userId', '==', null)
    .where('email', '==', email)
    .where('status', '==', TeamMemberStatus.Invited)
    .get()

  return docs.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as TeamMember[]
}
