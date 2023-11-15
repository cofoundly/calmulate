import { Team } from 'types'

export const makeTeam = ({
  id = '1',
  createdAt = '2020-01-01T00:00:00.000Z',
  name = "Franky's A Team",
  ownerId = '1',
  subscriptionId = '1',
}: Partial<Team>): Team => ({
  id,
  createdAt,
  name,
  ownerId,
  subscriptionId,
})
