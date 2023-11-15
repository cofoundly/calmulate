import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { routes } from '@/router/routes'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { useHasActiveSubscription } from './useHasActiveSubscription'
import { useRestrictedSubscriptionRoute } from './useRestrictedSubscriptionRoute'

const mocks = vi.hoisted(() => ({
  useHasActiveSubscription: vi.fn<any, Partial<ReturnType<typeof useHasActiveSubscription>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  navigate: vi.fn(),
}))

vi.mock('./useHasActiveSubscription', () => ({
  useHasActiveSubscription: mocks.useHasActiveSubscription,
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

describe('useRestrictedSubscriptionRoute', () => {
  cleanUpAfterEach()

  it('does not navigate away when loading', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    })

    const { result } = renderHook<ReturnType<typeof useRestrictedSubscriptionRoute>, any>(
      useRestrictedSubscriptionRoute,
      {
        wrapper: MockAppProvider,
      },
    )

    expect(result.current.data).toBe(undefined)
    expect(result.current.isLoading).toBe(true)
    expect(mocks.navigate).not.toHaveBeenCalled()
  })

  it('does not navigate away when the user has an active subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({
      data: true,
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useRestrictedSubscriptionRoute>, any>(
      useRestrictedSubscriptionRoute,
      {
        wrapper: MockAppProvider,
      },
    )

    expect(result.current.data).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(mocks.navigate).not.toHaveBeenCalled()
  })

  it('navigatess away when the user does not have an active subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({
      data: false,
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useRestrictedSubscriptionRoute>, any>(
      useRestrictedSubscriptionRoute,
      {
        wrapper: MockAppProvider,
      },
    )

    expect(result.current.data).toBe(false)
    expect(mocks.navigate).toHaveBeenCalledWith(routes.settingsSubscription)
  })
})
