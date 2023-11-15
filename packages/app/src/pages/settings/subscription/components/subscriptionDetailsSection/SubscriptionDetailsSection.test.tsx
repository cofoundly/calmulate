import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { usePrices } from '@/billing/hooks/usePrices'
import { useProducts } from '@/billing/hooks/useProducts'
import { useSubscriptions } from '@/billing/hooks/useSubscriptions'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'
import { useUser } from '@/user/hooks/useUser'

import { SubscriptionDetailsSection } from './SubscriptionDetailsSection'

const mocks = vi.hoisted(() => {
  return {
    useProducts: vi.fn<any, Partial<ReturnType<typeof useProducts>>>(() => ({ data: undefined, isLoading: false })),
    usePrices: vi.fn<any, Partial<ReturnType<typeof usePrices>>>(() => ({ data: undefined, isLoading: false })),
    useSubscriptions: vi.fn<any, Partial<ReturnType<typeof useSubscriptions>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useUser: vi.fn<any, Partial<ReturnType<typeof useUser>>>(() => ({ data: undefined, isLoading: false })),
    createBillingPortalSession: vi.fn(),
  }
})

vi.mock('@/billing/hooks/useProducts', () => ({
  useProducts: mocks.useProducts,
}))

vi.mock('@/billing/hooks/usePrices', () => ({
  usePrices: mocks.usePrices,
}))

vi.mock('@/billing/hooks/useSubscriptionsListener', () => ({
  useSubscriptionsListener: vi.fn(),
}))

vi.mock('@/billing/hooks/useSubscriptions', () => ({
  useSubscriptions: mocks.useSubscriptions,
}))

vi.mock('@/user/hooks/useUser', () => ({
  useUser: mocks.useUser,
}))

vi.mock('@/billing/hooks/useCreateBillingPortalSession', () => ({
  useCreateBillingPortalSession: () => ({
    mutate: mocks.createBillingPortalSession,
  }),
}))

describe('SubscriptionDetailsSection', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <SubscriptionDetailsSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Subscription details')).toBeInTheDocument()
  })

  it('creates a billing portal session', () => {
    render(
      <MockAppProvider>
        <SubscriptionDetailsSection />
      </MockAppProvider>,
    )

    fireEvent.click(screen.getByText('Manage plan'))

    expect(mocks.createBillingPortalSession).toHaveBeenCalledWith()
  })
})
