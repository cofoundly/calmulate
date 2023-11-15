import { doc, setDoc } from 'firebase/firestore'
import { FirestoreCollection, User } from 'types'

import { db } from '@/firebase'

export const updateUser = async (user: Partial<User> & { id: string }) => {
  const ref = doc(db, FirestoreCollection.Users, user.id)

  await setDoc(ref, user, { merge: true })
}
