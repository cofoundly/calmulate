import { FirestoreCollection, Team } from 'types'

import { firebase } from '@/firebase/admin'

export const getTeam = async (id: string) => {
  const doc = await firebase.firestore().collection(FirestoreCollection.Teams).doc(id).get()

  return doc.data() as Team | undefined
}
