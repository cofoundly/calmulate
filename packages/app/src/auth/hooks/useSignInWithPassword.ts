import { useMutation } from '@tanstack/react-query'

import { signInWithPassword } from '../api/signInWithPassword'

export const useSignInWithPassword = () => {
  return useMutation({
    mutationFn: signInWithPassword,
  })
}
