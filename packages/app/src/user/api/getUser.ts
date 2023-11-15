import { doc, getDoc } from 'firebase/firestore'
import { FirestoreCollection, User } from 'types'

import { db } from '@/firebase'

export const getUser = async (uid: string) => {
  const ref = doc(db, FirestoreCollection.Users, uid)

  const snapshot = await getDoc(ref)

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as User | undefined
}
