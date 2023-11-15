import { FirestoreCollection, Team } from 'types'

import { firebase } from '@/firebase/admin'

export const updateTeam = async (team: Team) => {
  await firebase.firestore().collection(FirestoreCollection.Teams).doc(team.id).set(team, { merge: true })
}
