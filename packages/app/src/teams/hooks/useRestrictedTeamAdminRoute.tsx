import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes, TEAM_ID_PARAM } from '@/router/routes'

import { useIsLoggedInUserTeamAdmin } from './useIsLoggedInUserTeamAdmin'
import { useTeam } from './useTeam'

export const useRestrictedTeamAdminRoute = () => {
  const {
    data: isLoggedInUserTeamAdmin,
    isLoading: isLoggedInUserTeamAdminLoading,
    ...query
  } = useIsLoggedInUserTeamAdmin()
  const { data: team, isLoading: teamsLoading } = useTeam()
  const navigate = useNavigate()

  const isLoading = isLoggedInUserTeamAdminLoading || teamsLoading

  // only admins of the team should be able to access this page
  useEffect(() => {
    if (!isLoading && !isLoggedInUserTeamAdmin && team) {
      navigate(routes.settingsTeam.replace(TEAM_ID_PARAM, team.id))
    }
  }, [isLoading, isLoggedInUserTeamAdmin, navigate, team])

  return {
    ...query,
    data: isLoggedInUserTeamAdmin,
    isLoading,
  }
}
