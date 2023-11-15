import { FirestoreCollection } from 'types'

import { firebase } from '@/firebase/admin'

export const deletePrice = async (id: string) => {
  await firebase.firestore().collection(FirestoreCollection.Prices).doc(id).delete()
}
