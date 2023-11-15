import { TeamMember } from 'types'

export const formatTeamMemberName = (teamMember?: Partial<TeamMember>) => {
  if (!teamMember || (!teamMember.firstName && !teamMember.lastName)) {
    return ''
  }

  return `${teamMember.firstName} ${teamMember.lastName}`
}
