import { collectionGroup, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { FirestoreCollection, Team } from 'types'

import { getAuthUser } from '@/auth/api/getAuthUser'
import { db } from '@/firebase'

export const getTeams = async () => {
  const authUser = await getAuthUser()

  if (!authUser) {
    return []
  }

  // first we need to fetch the user's team members
  const ref = collectionGroup(db, FirestoreCollection.TeamMembers)
  const queryRef = query(ref, where('userId', '==', authUser.uid), orderBy('createdAt', 'asc'))

  const snapshot = await getDocs(queryRef)

  // then we need to fetch the teams
  const teams = await Promise.all(
    snapshot.docs.map(async teamMemberDoc => {
      const teamId = teamMemberDoc.data().teamId

      if (teamId) {
        const teamRef = doc(db, FirestoreCollection.Teams, teamId)
        const teamDoc = await getDoc(teamRef)

        return teamDoc
      }
    }),
  )

  return teams.map(team => ({
    id: team?.id,
    ...team?.data(),
  })) as Team[]
}
