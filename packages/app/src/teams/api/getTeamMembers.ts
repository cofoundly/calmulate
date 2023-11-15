import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { FirestoreCollection, TeamMember } from 'types'

import { db } from '@/firebase'

export const getTeamMembers = async (teamId: string) => {
  const ref = collection(db, FirestoreCollection.Teams, teamId, FirestoreCollection.TeamMembers)
  const queryRef = query(ref, orderBy('createdAt', 'asc'))

  const snapshot = await getDocs(queryRef)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as TeamMember[]
}
