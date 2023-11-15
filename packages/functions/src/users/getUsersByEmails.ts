import { FirestoreCollection, User } from 'types'

import { firebase } from '@/firebase/admin'

export const getUsersByEmails = async (emails: string[]) => {
  const docs = await firebase.firestore().collection(FirestoreCollection.Users).where('email', 'in', emails).get()

  return docs.docs.map(doc => doc.data()) as User[]
}
