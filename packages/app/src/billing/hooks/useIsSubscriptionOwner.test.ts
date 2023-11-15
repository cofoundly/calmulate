import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'

import { makeSubscriptionSeat } from '../mocks/makeSubscriptionSeat'
import { useIsSubscriptionOwner } from './useIsSubscriptionOwner'
import { useSubscriptionSeats } from './useSubscriptionSeats'

const mocks = vi.hoisted(() => ({
  useSubscriptionSeats: vi.fn<any, Partial<ReturnType<typeof useSubscriptionSeats>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
}))

vi.mock('./useSubscriptionSeats', () => ({
  useSubscriptionSeats: mocks.useSubscriptionSeats,
}))

describe('useIsSubscriptionOwner', () => {
  cleanUpAfterEach()

  it('returns false when the subscription seats are loading', () => {
    const { result } = renderHook<ReturnType<typeof useIsSubscriptionOwner>, any>(useIsSubscriptionOwner)

    expect(result.current.data).toBe(false)
  })

  it('returns false when there are no subscription seats', () => {
    mocks.useSubscriptionSeats.mockReturnValueOnce({
      data: [],
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsSubscriptionOwner>, any>(useIsSubscriptionOwner)

    expect(result.current.data).toBe(false)
  })

  it('returns false when there are no owned subscription seats', () => {
    mocks.useSubscriptionSeats.mockReturnValueOnce({
      data: [makeSubscriptionSeat({ isSubscriptionOwner: false })],
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsSubscriptionOwner>, any>(useIsSubscriptionOwner)

    expect(result.current.data).toBe(false)
  })

  it('returns true when there is an owned subscription seat', () => {
    mocks.useSubscriptionSeats.mockReturnValueOnce({
      data: [makeSubscriptionSeat({ isSubscriptionOwner: true })],
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useIsSubscriptionOwner>, any>(useIsSubscriptionOwner)

    expect(result.current.data).toBe(true)
  })
})
