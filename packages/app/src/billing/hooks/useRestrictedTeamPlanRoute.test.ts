import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { routes } from '@/router/routes'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { useHasTeamPlan } from './useHasTeamPlan'
import { useRestrictedTeamPlanRoute } from './useRestrictedTeamPlanRoute'

const mocks = vi.hoisted(() => ({
  useHasTeamPlan: vi.fn<any, Partial<ReturnType<typeof useHasTeamPlan>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  navigate: vi.fn(),
}))

vi.mock('./useHasTeamPlan', () => ({
  useHasTeamPlan: mocks.useHasTeamPlan,
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

describe('useRestrictedTeamPlanRoute', () => {
  cleanUpAfterEach()

  it('does not navigate away when loading', () => {
    mocks.useHasTeamPlan.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    })

    const { result } = renderHook<ReturnType<typeof useRestrictedTeamPlanRoute>, any>(useRestrictedTeamPlanRoute, {
      wrapper: MockAppProvider,
    })

    expect(result.current.data).toBe(undefined)
    expect(result.current.isLoading).toBe(true)
    expect(mocks.navigate).not.toHaveBeenCalled()
  })

  it('does not navigate away when the user has an active subscription', () => {
    mocks.useHasTeamPlan.mockReturnValueOnce({
      data: true,
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useRestrictedTeamPlanRoute>, any>(useRestrictedTeamPlanRoute, {
      wrapper: MockAppProvider,
    })

    expect(result.current.data).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(mocks.navigate).not.toHaveBeenCalled()
  })

  it('navigatess away when the user does not have an active subscription', () => {
    mocks.useHasTeamPlan.mockReturnValueOnce({
      data: false,
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useRestrictedTeamPlanRoute>, any>(useRestrictedTeamPlanRoute, {
      wrapper: MockAppProvider,
    })

    expect(result.current.data).toBe(false)
    expect(mocks.navigate).toHaveBeenCalledWith(routes.settingsSubscription)
  })
})
