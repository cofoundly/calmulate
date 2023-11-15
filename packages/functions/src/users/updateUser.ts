import { FirestoreCollection, User } from 'types'

import { firebase } from '@/firebase/admin'

export const updateUser = async (uid: string, data: Partial<User>) => {
  await firebase.firestore().collection(FirestoreCollection.Users).doc(uid).set(data, { merge: true })
}
