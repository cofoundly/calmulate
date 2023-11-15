import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/firebase'

export const signInWithPassword = async ({ email, password }: { email: string; password: string }) => {
  await signInWithEmailAndPassword(auth, email, password)
}
