import { TeamMemberStatus } from 'types'

export const formatTeamMemberStatus = (status: TeamMemberStatus): string => {
  switch (status) {
    case 'active':
      return 'Active'
    case 'invited':
      return 'Invited'
    default:
      return ''
  }
}
