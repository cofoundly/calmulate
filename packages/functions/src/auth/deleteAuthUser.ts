import { firebase } from '@/firebase/admin'

export const deleteAuthUser = async (userId: string) => {
  await firebase.auth().deleteUser(userId)
}
