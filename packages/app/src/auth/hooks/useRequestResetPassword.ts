import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { requestResetPassword } from '../api/requestResetPassword'

export const useRequestResetPassword = () => {
  return useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      toast.success('Email sent!')
    },
  })
}
