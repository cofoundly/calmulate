import { FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'

export const deleteUser = async (userId: string) => {
  await firebase.firestore().collection(FirestoreCollection.Users).doc(userId).delete()
}
