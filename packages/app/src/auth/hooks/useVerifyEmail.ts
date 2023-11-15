import { useMutation } from '@tanstack/react-query'

import { verifyEmail } from '../api/verifyEmail'

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  })
}
