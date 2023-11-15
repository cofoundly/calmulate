import { TeamMemberRole } from 'types'
import { describe, expect, it } from 'vitest'

import { formatTeamMemberRole } from './formatTeamMemberRole'

describe('formatTeamMemberRole', () => {
  it('formats a team member role', () => {
    expect(formatTeamMemberRole(TeamMemberRole.Admin)).toBe('Admin')
    expect(formatTeamMemberRole(TeamMemberRole.Member)).toBe('Member')
  })
})
