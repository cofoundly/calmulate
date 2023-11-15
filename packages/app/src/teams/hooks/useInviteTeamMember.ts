import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { routes, TEAM_ID_PARAM } from '@/router/routes'
import { inviteTeamMembers } from '@/teams/api/inviteTeamMembers'
import { getTeamMembersQueryKey } from '@/types'

export const useInviteTeamMembers = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: inviteTeamMembers,
    onSuccess: (_, { teamId }) => {
      // invalidate the team members query to refetch the data
      queryClient.invalidateQueries([getTeamMembersQueryKey(teamId)])

      toast.success('Team members invited successfully')

      navigate(routes.settingsTeam.replace(TEAM_ID_PARAM, teamId))
    },
  })
}
