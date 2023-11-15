import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { QueryKeys } from '@/types'

import { updateUser } from '../api/updateUser'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.User])

      toast.success('Your details have been updated successfully.')
    },
  })
}
