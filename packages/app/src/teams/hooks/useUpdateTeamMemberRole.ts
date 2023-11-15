import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { getTeamMembersQueryKey } from '@/types'

import { updateTeamMemberRole } from '../api/updateTeamMemberRole'

export const useUpdateTeamMemberRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTeamMemberRole,
    onSuccess: (_, { teamId }) => {
      // invalidate the team members query to refetch the data
      queryClient.invalidateQueries([getTeamMembersQueryKey(teamId)])

      toast.success('Team member updated successfully')
    },
  })
}
