import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { routes, TEAM_ID_PARAM } from '@/router/routes'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { makeTeamWithMembers } from '../mocks/makeTeamWithMembers'
import { useIsLoggedInUserTeamAdmin } from './useIsLoggedInUserTeamAdmin'
import { useRestrictedTeamAdminRoute } from './useRestrictedTeamAdminRoute'
import { useTeam } from './useTeam'

const mocks = vi.hoisted(() => ({
  useIsLoggedInUserTeamAdmin: vi.fn<any, Partial<ReturnType<typeof useIsLoggedInUserTeamAdmin>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  useTeam: vi.fn<any, Partial<ReturnType<typeof useTeam>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  navigate: vi.fn(),
}))

vi.mock('./useIsLoggedInUserTeamAdmin', () => ({
  useIsLoggedInUserTeamAdmin: mocks.useIsLoggedInUserTeamAdmin,
}))

vi.mock('./useTeam', () => ({
  useTeam: mocks.useTeam,
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

describe('useRestrictedTeamAdminRoute', () => {
  cleanUpAfterEach()

  it('does not navigate away when loading', () => {
    mocks.useIsLoggedInUserTeamAdmin.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    })

    const { result } = renderHook<ReturnType<typeof useRestrictedTeamAdminRoute>, any>(useRestrictedTeamAdminRoute, {
      wrapper: MockAppProvider,
    })

    expect(result.current.data).toBe(undefined)
    expect(result.current.isLoading).toBe(true)
    expect(mocks.navigate).not.toHaveBeenCalled()
  })

  it('does not navigate away when the user is a team admin', () => {
    mocks.useIsLoggedInUserTeamAdmin.mockReturnValueOnce({
      data: true,
      isLoading: false,
    })
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: {}, members: [] }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useRestrictedTeamAdminRoute>, any>(useRestrictedTeamAdminRoute, {
      wrapper: MockAppProvider,
    })

    expect(result.current.data).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(mocks.navigate).not.toHaveBeenCalled()
  })

  it('navigatess away when the user is not a team admin', () => {
    mocks.useIsLoggedInUserTeamAdmin.mockReturnValueOnce({
      data: false,
      isLoading: false,
    })
    const teamId = 'team-1'
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: { id: teamId }, members: [] }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useRestrictedTeamAdminRoute>, any>(useRestrictedTeamAdminRoute, {
      wrapper: MockAppProvider,
    })

    expect(result.current.data).toBe(false)
    expect(mocks.navigate).toHaveBeenCalledWith(routes.settingsTeam.replace(TEAM_ID_PARAM, teamId))
  })
})
