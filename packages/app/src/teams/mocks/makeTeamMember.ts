import { TeamMember, TeamMemberRole, TeamMemberStatus } from 'types'

export const makeTeamMember = ({
  id = '1',
  createdAt = '2020-01-01T00:00:00.000Z',
  teamId = '1',
  userId = '1',
  firstName = 'Frank',
  lastName = 'Gallagher',
  email = 'frank.gallagher@gmail.com',
  role = TeamMemberRole.Member,
  status = TeamMemberStatus.Active,
  invitedBy = '2',
}: Partial<TeamMember>): TeamMember => ({
  id,
  createdAt,
  teamId,
  userId,
  firstName,
  lastName,
  email,
  role,
  status,
  invitedBy,
})
