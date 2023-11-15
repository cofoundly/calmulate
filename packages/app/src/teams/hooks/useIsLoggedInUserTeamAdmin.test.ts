import { renderHook } from '@testing-library/react'
import { TeamMemberRole } from 'types'
import { describe, expect, it, vi } from 'vitest'

import { useAuthUser } from '@/auth/hooks/useAuthUser'
import { makeAuthUser } from '@/auth/mocks/makeAuthUser'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'

import { makeTeamWithMembers } from '../mocks/makeTeamWithMembers'
import { useIsLoggedInUserTeamAdmin } from './useIsLoggedInUserTeamAdmin'
import { useTeam } from './useTeam'

const mocks = vi.hoisted(() => ({
  useAuthUser: vi.fn<any, Partial<ReturnType<typeof useAuthUser>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  useTeam: vi.fn<any, Partial<ReturnType<typeof useTeam>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
}))

vi.mock('@/auth/hooks/useAuthUser', () => ({
  useAuthUser: mocks.useAuthUser,
}))

vi.mock('./useTeam', () => ({
  useTeam: mocks.useTeam,
}))

describe('useIsLoggedInUserTeamAdmin', () => {
  cleanUpAfterEach()

  it('returns false when loading', () => {
    const { result } = renderHook<ReturnType<typeof useIsLoggedInUserTeamAdmin>, any>(useIsLoggedInUserTeamAdmin)

    expect(result.current.data).toBe(false)
  })

  it('returns false when there is no auth user', () => {
    mocks.useAuthUser.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
    })
    mocks.useTeam.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsLoggedInUserTeamAdmin>, any>(useIsLoggedInUserTeamAdmin)

    expect(result.current.data).toBe(false)
  })

  it('returns false when there is no team', () => {
    mocks.useAuthUser.mockReturnValueOnce({
      data: makeAuthUser({}),
      isLoading: false,
    })
    mocks.useTeam.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsLoggedInUserTeamAdmin>, any>(useIsLoggedInUserTeamAdmin)

    expect(result.current.data).toBe(false)
  })

  it('returns false when the user is not an admin of the team', () => {
    const uid = '12345678'
    mocks.useAuthUser.mockReturnValueOnce({
      data: makeAuthUser({ uid }),
      isLoading: false,
    })
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: {}, members: [{ userId: uid, role: TeamMemberRole.Member }] }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsLoggedInUserTeamAdmin>, any>(useIsLoggedInUserTeamAdmin)

    expect(result.current.data).toBe(false)
  })

  it('returns true when the user is an admin of the team', () => {
    const uid = '12345678'
    mocks.useAuthUser.mockReturnValueOnce({
      data: makeAuthUser({ uid }),
      isLoading: false,
    })
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: {}, members: [{ userId: uid, role: TeamMemberRole.Admin }] }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsLoggedInUserTeamAdmin>, any>(useIsLoggedInUserTeamAdmin)

    expect(result.current.data).toBe(true)
  })
})
