import { firebase } from '@/firebase/admin'

export const deleteDocs = async (docs: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
  const batch = firebase.firestore().batch()

  docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  await batch.commit()
}
