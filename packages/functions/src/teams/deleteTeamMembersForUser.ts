import { FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'
import { deleteDocs } from '@/firebase/deleteDocs'

export const deleteTeamMembersForUser = async (userId: string) => {
  const docs = await firebase
    .firestore()
    .collectionGroup(FirestoreCollection.TeamMembers)
    .where('userId', '==', userId)
    .get()

  await deleteDocs(docs)
}
