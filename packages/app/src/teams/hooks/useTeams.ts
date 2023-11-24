import { useQueries, useQuery } from '@tanstack/react-query'
import { TeamWithMembers } from 'types'

import { features } from '@/features'
import { getTeams } from '@/teams/api/getTeams'
import { getTeamMembersQueryKey, QueryKeys } from '@/types'

import { getTeamMembers } from '../api/getTeamMembers'

export const useTeams = () => {
  const { data: teams, ...teamsQuery } = useQuery({
    queryKey: [QueryKeys.Teams],
    queryFn: getTeams,
    enabled: features.teams,
  })
  const teamMembersQueries = useQueries({
    queries:
      teams?.map(team => ({
        queryKey: [getTeamMembersQueryKey(team.id)],
        queryFn: () => getTeamMembers(team.id),
        enabled: Boolean(team.id),
      })) || [],
  })

  const teamsWithMembers: TeamWithMembers[] =
    teams?.map(team => {
      const teamMembersQuery = teamMembersQueries.find(query => query.data && query.data[0].teamId === team.id)
      const teamMembers = teamMembersQuery?.data || []

      return {
        ...team,
        members: teamMembers,
      }
    }) || []
  const isLoading = teamsQuery.isLoading || teamMembersQueries.some(query => query.isLoading)

  return {
    ...teamsQuery,
    data: teamsWithMembers,
    isLoading,
  }
}
