import { firebase } from '@/firebase/admin'

export const getAuthUserByEmail = async (email: string) => {
  // firebase throws an error if a user cannot be found, so we need to catch it and return undefined
  try {
    const user = await firebase.auth().getUserByEmail(email)

    return user
  } catch (error) {
    return undefined
  }
}
