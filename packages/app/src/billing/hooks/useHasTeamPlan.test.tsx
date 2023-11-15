import { renderHook } from '@testing-library/react'
import { makePrice, makeProduct } from 'utils'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'

import { makeSubscriptionInfo } from '../mocks/makeSubscriptionInfo'
import { useHasTeamPlan } from './useHasTeamPlan'
import { usePrices } from './usePrices'
import { useProducts } from './useProducts'
import { useSubscriptionInfo } from './useSubscriptionInfo'

const mocks = vi.hoisted(() => ({
  useSubscriptionInfo: vi.fn<any, Partial<ReturnType<typeof useSubscriptionInfo>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  usePrices: vi.fn<any, Partial<ReturnType<typeof usePrices>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  useProducts: vi.fn<any, Partial<ReturnType<typeof useProducts>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
}))

vi.mock('./useSubscriptionInfo', () => ({
  useSubscriptionInfo: mocks.useSubscriptionInfo,
}))

vi.mock('./usePrices', () => ({
  usePrices: mocks.usePrices,
}))

vi.mock('./useProducts', () => ({
  useProducts: mocks.useProducts,
}))

describe('useHasTeamPlan', () => {
  cleanUpAfterEach()

  it('returns false when loading', () => {
    const { result } = renderHook<ReturnType<typeof useHasTeamPlan>, any>(useHasTeamPlan)

    expect(result.current.data).toBe(false)
  })

  it('returns false when there is no subscription', () => {
    mocks.useSubscriptionInfo.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
    })
    mocks.usePrices.mockReturnValueOnce({
      data: [makePrice({})],
      isLoading: false,
    })
    mocks.useProducts.mockReturnValueOnce({
      data: [makeProduct({})],
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useHasTeamPlan>, any>(useHasTeamPlan)

    expect(result.current.data).toBe(false)
  })

  it('returns false when the user is not on the team plan', () => {
    const priceId = 'price-1'
    const productId = 'product-1'
    mocks.useSubscriptionInfo.mockReturnValueOnce({
      data: makeSubscriptionInfo({ priceId }),
      isLoading: false,
    })
    mocks.usePrices.mockReturnValueOnce({
      data: [makePrice({ id: priceId, productId })],
      isLoading: false,
    })
    mocks.useProducts.mockReturnValueOnce({
      data: [makeProduct({ id: productId, teamPlan: false })],
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useHasTeamPlan>, any>(useHasTeamPlan)

    expect(result.current.data).toBe(false)
  })

  it('returns true when the user is on the team plan', () => {
    const priceId = 'price-1'
    const productId = 'product-1'
    mocks.useSubscriptionInfo.mockReturnValueOnce({
      data: makeSubscriptionInfo({ priceId }),
      isLoading: false,
    })
    mocks.usePrices.mockReturnValueOnce({
      data: [makePrice({ id: priceId, productId })],
      isLoading: false,
    })
    mocks.useProducts.mockReturnValueOnce({
      data: [makeProduct({ id: productId, teamPlan: true })],
      isLoading: false,
    })

    const { result } = renderHook<ReturnType<typeof useHasTeamPlan>, any>(useHasTeamPlan)

    expect(result.current.data).toBe(true)
  })
})
