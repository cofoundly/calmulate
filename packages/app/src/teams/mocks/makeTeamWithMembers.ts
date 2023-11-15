import { Team, TeamMember, TeamWithMembers } from 'types'

import { makeTeam } from './makeTeam'
import { makeTeamMember } from './makeTeamMember'

export const makeTeamWithMembers = ({
  team: partialTeam,
  members: partialMembers,
}: {
  team: Partial<Team>
  members: Array<Partial<TeamMember>>
}): TeamWithMembers => {
  const team = makeTeam(partialTeam)
  const members = partialMembers.map(makeTeamMember)
  const teamWithTeamMembers: TeamWithMembers = {
    ...team,
    members,
  }

  return teamWithTeamMembers
}
