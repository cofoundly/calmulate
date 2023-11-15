import { useAuthUser } from '@/auth/hooks/useAuthUser'

import { useTeam } from './useTeam'

export const useIsLoggedInUserTeamAdmin = () => {
  const { data: authUser, isLoading: isAuthUserLoading } = useAuthUser()
  const { data: team, isLoading: isTeamLoading, ...query } = useTeam()

  const authUserTeamMember = team?.members?.find(member => member.userId === authUser?.uid)
  const isLoggedInUserTeamAdmin = authUserTeamMember?.role === 'admin'
  const isLoading = isAuthUserLoading || isTeamLoading

  return {
    ...query,
    data: isLoggedInUserTeamAdmin,
    isLoading,
  }
}
