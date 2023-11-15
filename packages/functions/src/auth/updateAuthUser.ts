import { UpdateRequest } from 'firebase-admin/auth'

import { firebase } from '@/firebase/admin'

export const updateAuthUser = async (uid: string, data: UpdateRequest) => {
  await firebase.auth().updateUser(uid, data)
}
