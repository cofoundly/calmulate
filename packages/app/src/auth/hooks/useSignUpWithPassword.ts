import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { QueryKeys } from '@/types'

import { signUp } from '../api/signUp'

export const useSignUpWithPassword = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // invalidate the user query to refetch the user
      // we need the setTimeout because the user query is not enabled yet
      setTimeout(() => {
        queryClient.invalidateQueries([QueryKeys.User])
      }, 500)

      toast.success('A confirmation email has been sent to your inbox.')
    },
  })
}
