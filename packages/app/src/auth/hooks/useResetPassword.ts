import { useMutation } from '@tanstack/react-query'

import { resetPassword } from '../api/resetPassword'

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  })
}
