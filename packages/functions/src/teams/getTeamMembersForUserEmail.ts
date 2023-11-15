import { FirestoreCollection, TeamMember } from 'types'

import { firebase } from '@/firebase/admin'

export const getTeamMembersForUserEmail = async (email: string) => {
  // NOTE: we use email because the user may not have signed up yet
  const docs = await firebase
    .firestore()
    .collectionGroup(FirestoreCollection.TeamMembers)
    .where('email', '==', email)
    .get()

  return docs.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as TeamMember[]
}
