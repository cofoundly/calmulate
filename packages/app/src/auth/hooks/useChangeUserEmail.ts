import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeys } from '@/types'

import { changeUserEmail } from '../api/changeUserEmail'

export const useChangeUserEmail = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changeUserEmail,
    onSuccess: async () => {
      // invalidate the user data query so it will be refetched with the new email
      queryClient.invalidateQueries([QueryKeys.User])
    },
  })
}
