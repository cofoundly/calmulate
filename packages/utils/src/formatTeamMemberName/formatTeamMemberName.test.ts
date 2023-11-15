import { describe, expect, it } from 'vitest'

import { formatTeamMemberName } from './formatTeamMemberName'

describe('formatTeamMemberName', () => {
  it('formats a team member name when there is no team member', () => {
    expect(formatTeamMemberName()).toBe('')
  })

  it('formats a team member name when there is no first or last name', () => {
    expect(
      formatTeamMemberName({
        firstName: '',
        lastName: '',
      }),
    ).toBe('')
  })

  it('formats a team member name', () => {
    expect(
      formatTeamMemberName({
        firstName: 'John',
        lastName: 'Doe',
      }),
    ).toBe('John Doe')
  })
})
