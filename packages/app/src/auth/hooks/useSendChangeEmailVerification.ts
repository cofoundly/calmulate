import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useUserEmail } from '@/user/hooks/useUserEmail'

import { sendChangeEmailVerification } from '../api/sendChangeEmailVerification'
import { useSignOut } from './useSignOut'

const IS_DEVELOPMENT = import.meta.env.MODE === 'development'

export const useSendChangeEmailVerification = () => {
  const [_, setUserEmail] = useUserEmail()

  const { mutate: signOut } = useSignOut()

  return useMutation({
    mutationFn: sendChangeEmailVerification,
    onSuccess: async (_, { newEmail }) => {
      signOut()

      // update the user's email in the app for quicker sign in
      setUserEmail(newEmail)

      toast.success(
        `Your email has been changed. ${
          // email address verification and changing is currently not implemented in the emulator so we do it manually
          // https://github.com/firebase/firebase-tools/issues/3424
          IS_DEVELOPMENT ? 'Sign in with your new email to continue.' : 'Check your inbox for a verification email.'
        }`,
      )
    },
  })
}
