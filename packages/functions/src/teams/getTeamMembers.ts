import { FirestoreCollection, TeamMember } from 'types'

import { firebase } from '@/firebase/admin'

export const getTeamMembers = async (teamId: string) => {
  const data = await firebase.firestore().collection(FirestoreCollection.Teams).doc(teamId).collection('members').get()

  return data.docs.map(doc => doc.data()) as TeamMember[]
}
