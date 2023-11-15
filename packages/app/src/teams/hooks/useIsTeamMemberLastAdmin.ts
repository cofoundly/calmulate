import { TeamMemberRole } from 'types'

import { useTeam } from './useTeam'
import { useTeamMember } from './useTeamMember'

export const useIsTeamMemberLastAdmin = () => {
  const { data: team, isLoading: teamLoading, ...query } = useTeam()
  const { data: teamMember, isLoading: teamMemberLoading } = useTeamMember()

  const teamHasOneAdmin = team?.members.filter(member => member.role === TeamMemberRole.Admin).length === 1
  const isLastAdmin = teamMember?.role === TeamMemberRole.Admin && teamHasOneAdmin
  const isLoading = teamLoading || teamMemberLoading

  return {
    data: isLastAdmin,
    isLoading,
    ...query,
  }
}
