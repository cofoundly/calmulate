import { auth } from '@/firebase'

export const getAuthUser = async () => {
  await auth.authStateReady()

  const user = auth.currentUser

  return user
}
