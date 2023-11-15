import { useMutation } from '@tanstack/react-query'

import { sendEmailVerification } from '../api/sendEmailVerification'

export const useSendEmailVerification = () => {
  return useMutation({
    mutationFn: sendEmailVerification,
  })
}
