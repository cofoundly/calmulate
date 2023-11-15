import { useParams } from 'react-router-dom'

import { useTeam } from './useTeam'

export const useTeamMember = () => {
  const { teamMemberId = '' } = useParams()
  const { data: team, ...query } = useTeam()

  const teamMember = team?.members.find(member => member.id === teamMemberId)

  return {
    ...query,
    data: teamMember,
  }
}
