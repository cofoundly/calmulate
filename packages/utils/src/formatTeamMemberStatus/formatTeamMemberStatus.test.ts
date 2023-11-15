import { TeamMemberStatus } from 'types'
import { describe, expect, it } from 'vitest'

import { formatTeamMemberStatus } from './formatTeamMemberStatus'

describe('formatTeamMemberStatus', () => {
  it('formats a team member status', () => {
    expect(formatTeamMemberStatus(TeamMemberStatus.Active)).toBe('Active')
    expect(formatTeamMemberStatus(TeamMemberStatus.Invited)).toBe('Invited')
  })
})
