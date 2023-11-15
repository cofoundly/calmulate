import { renderHook } from '@testing-library/react'
import { TeamMemberRole } from 'types'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'

import { makeTeamMember } from '../mocks/makeTeamMember'
import { makeTeamWithMembers } from '../mocks/makeTeamWithMembers'
import { useIsTeamMemberLastAdmin } from './useIsTeamMemberLastAdmin'
import { useTeam } from './useTeam'
import { useTeamMember } from './useTeamMember'

const mocks = vi.hoisted(() => ({
  useTeam: vi.fn<any, Partial<ReturnType<typeof useTeam>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  useTeamMember: vi.fn<any, Partial<ReturnType<typeof useTeamMember>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
}))

vi.mock('./useTeam', () => ({
  useTeam: mocks.useTeam,
}))

vi.mock('./useTeamMember', () => ({
  useTeamMember: mocks.useTeamMember,
}))

describe('useIsTeamMemberLastAdmin', () => {
  cleanUpAfterEach()

  it('returns false when loading', () => {
    const { result } = renderHook<ReturnType<typeof useIsTeamMemberLastAdmin>, any>(useIsTeamMemberLastAdmin)

    expect(result.current.data).toBe(false)
  })

  it('returns false when there is no team', () => {
    mocks.useTeam.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
    })
    mocks.useTeamMember.mockReturnValueOnce({
      data: makeTeamMember({}),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsTeamMemberLastAdmin>, any>(useIsTeamMemberLastAdmin)

    expect(result.current.data).toBe(false)
  })

  it('returns false when there is no team member', () => {
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: {}, members: [] }),
      isLoading: false,
    })
    mocks.useTeamMember.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsTeamMemberLastAdmin>, any>(useIsTeamMemberLastAdmin)

    expect(result.current.data).toBe(false)
  })

  it('returns false when there is more than one admin', () => {
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({
        team: {},
        members: [{ role: TeamMemberRole.Admin }, { role: TeamMemberRole.Admin }],
      }),
      isLoading: false,
    })
    mocks.useTeamMember.mockReturnValueOnce({
      data: makeTeamMember({ role: TeamMemberRole.Admin }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsTeamMemberLastAdmin>, any>(useIsTeamMemberLastAdmin)

    expect(result.current.data).toBe(false)
  })

  it('returns false when the team member is not an admin', () => {
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({
        team: {},
        members: [{ role: TeamMemberRole.Admin }, { role: TeamMemberRole.Member }],
      }),
      isLoading: false,
    })
    mocks.useTeamMember.mockReturnValueOnce({
      data: makeTeamMember({ role: TeamMemberRole.Member }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsTeamMemberLastAdmin>, any>(useIsTeamMemberLastAdmin)

    expect(result.current.data).toBe(false)
  })

  it('returns true when there is only one admin', () => {
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({
        team: {},
        members: [{ role: TeamMemberRole.Admin }],
      }),
      isLoading: false,
    })
    mocks.useTeamMember.mockReturnValueOnce({
      data: makeTeamMember({ role: TeamMemberRole.Admin }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsTeamMemberLastAdmin>, any>(useIsTeamMemberLastAdmin)

    expect(result.current.data).toBe(true)
  })
})
