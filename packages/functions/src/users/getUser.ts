import { FirestoreCollection, User } from 'types'

import { firebase } from '@/firebase/admin'

export const getUser = async (uid: string) => {
  const doc = await firebase.firestore().collection(FirestoreCollection.Users).doc(uid).get()

  return {
    id: doc.id,
    ...doc.data(),
  } as User | undefined
}
