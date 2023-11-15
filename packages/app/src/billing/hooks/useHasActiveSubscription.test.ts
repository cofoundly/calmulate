import { renderHook } from '@testing-library/react'
import { SubscriptionStatus } from 'types'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'

import { makeSubscriptionInfo } from '../mocks/makeSubscriptionInfo'
import { useHasActiveSubscription } from './useHasActiveSubscription'
import { useSubscriptionInfo } from './useSubscriptionInfo'

const mocks = vi.hoisted(() => ({
  useSubscriptionInfo: vi.fn<any, Partial<ReturnType<typeof useSubscriptionInfo>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
}))

vi.mock('./useSubscriptionInfo', () => ({
  useSubscriptionInfo: mocks.useSubscriptionInfo,
}))

describe('useHasActiveSubscription', () => {
  cleanUpAfterEach()

  it('returns false when the subscription info is loading', () => {
    const { result } = renderHook<ReturnType<typeof useHasActiveSubscription>, any>(useHasActiveSubscription)

    expect(result.current.data).toBe(false)
  })

  it('returns false when the subscription is not in active or trialing status', () => {
    mocks.useSubscriptionInfo.mockReturnValueOnce({
      data: makeSubscriptionInfo({ status: SubscriptionStatus.Cancelled }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useHasActiveSubscription>, any>(useHasActiveSubscription)

    expect(result.current.data).toBe(false)
  })

  it('returns true when the subscription is in active status', () => {
    mocks.useSubscriptionInfo.mockReturnValueOnce({
      data: makeSubscriptionInfo({ status: SubscriptionStatus.Active }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useHasActiveSubscription>, any>(useHasActiveSubscription)

    expect(result.current.data).toBe(true)
  })

  it('returns true when the subscription is in trialing status', () => {
    mocks.useSubscriptionInfo.mockReturnValueOnce({
      data: makeSubscriptionInfo({ status: SubscriptionStatus.Trialing }),
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useHasActiveSubscription>, any>(useHasActiveSubscription)

    expect(result.current.data).toBe(true)
  })
})
