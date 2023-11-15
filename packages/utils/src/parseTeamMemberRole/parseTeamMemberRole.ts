import { TeamMemberRole } from 'types'

export const parseTeamMemberRole = (role: string): TeamMemberRole => {
  switch (role) {
    case 'admin':
      return TeamMemberRole.Admin
    default:
      return TeamMemberRole.Member
  }
}
