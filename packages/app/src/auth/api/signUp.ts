import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/firebase'
import { updateUser } from '@/user/api/updateUser'

import { sendEmailVerification } from './sendEmailVerification'
import { signOut } from './signOut'

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string
  lastName: string
  email: string
  password: string
}) => {
  // sign out any existing user
  await signOut()

  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  // save the user data
  const { uid } = userCredential.user

  await updateUser({
    id: uid,
    firstName,
    lastName,
    email,
  })

  await sendEmailVerification({ email })

  // the step above will sign in the user, so we need to sign them out again for our auth flow to work correctly
  await signOut()
}
