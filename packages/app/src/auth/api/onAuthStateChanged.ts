import { User } from 'firebase/auth'

import { auth } from '@/firebase'

export const onAuthStateChanged = (cb: (user: User | null) => void) => {
  return auth.onAuthStateChanged(user => {
    cb(user)
  })
}
