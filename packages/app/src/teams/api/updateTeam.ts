import { doc, updateDoc } from 'firebase/firestore'
import { FirestoreCollection } from 'types'

import { db } from '@/firebase'

export const updateTeam = async ({ id, name }: { id: string; name: string }) => {
  const ref = doc(db, FirestoreCollection.Teams, id)

  await updateDoc(ref, { name })
}
