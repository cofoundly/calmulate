import { useParams } from 'react-router-dom'

import { useTeams } from './useTeams'

export const useTeam = () => {
  const { teamId = '' } = useParams()
  const { data: teams, ...teamsQuery } = useTeams()

  const team = teams?.find(team => team.id === teamId)

  return {
    data: team,
    ...teamsQuery,
  }
}
