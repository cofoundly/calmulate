import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { deleteUserAccount } from '../api/deleteUserAccount'

export const useDeleteUserAccount = () => {
  return useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: async () => {
      toast.success('Your account has been deleted successfully.')
    },
  })
}
