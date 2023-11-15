import { firebase } from '@/firebase/admin'

export const getAuthUser = async (uid: string) => {
  const user = await firebase.auth().getUser(uid)

  return user
}
