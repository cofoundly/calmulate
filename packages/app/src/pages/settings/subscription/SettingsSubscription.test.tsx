import { render, screen } from '@testing-library/react'
import { Loading } from 'components'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { useIsSubscriptionOwner } from '@/billing/hooks/useIsSubscriptionOwner'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { SettingsSubscription } from '.'

enum MockTestIds {
  ManagedSubscriptionSection = 'managedSubscriptionSection',
  Pricing = 'pricing',
  SubscriptionDetailsSection = 'subscriptionDetailsSection',
  SubscriptionSeatsSection = 'subscriptionSeatsSection',
}

vi.mock(
  './components/managedSubscriptionSection/ManagedSubscriptionSection',
  vi.fn(() => ({
    ManagedSubscriptionSection: () => <div data-testid={MockTestIds.ManagedSubscriptionSection} />,
  })),
)

vi.mock(
  './components/pricing/Pricing',
  vi.fn(() => ({
    Pricing: () => <div data-testid={MockTestIds.Pricing} />,
  })),
)

vi.mock(
  './components/subscriptionDetailsSection/SubscriptionDetailsSection',
  vi.fn(() => ({
    SubscriptionDetailsSection: () => <div data-testid={MockTestIds.SubscriptionDetailsSection} />,
  })),
)

vi.mock(
  './components/subscriptionSeatsSection/SubscriptionSeatsSection',
  vi.fn(() => ({
    SubscriptionSeatsSection: () => <div data-testid={MockTestIds.SubscriptionSeatsSection} />,
  })),
)

const mocks = vi.hoisted(() => {
  return {
    useHasActiveSubscription: vi.fn<any, Partial<ReturnType<typeof useHasActiveSubscription>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useIsSubscriptionOwner: vi.fn<any, Partial<ReturnType<typeof useIsSubscriptionOwner>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
  }
})

vi.mock('@/billing/hooks/useHasActiveSubscription', () => ({
  useHasActiveSubscription: mocks.useHasActiveSubscription,
}))

vi.mock('@/billing/hooks/useIsSubscriptionOwner', () => ({
  useIsSubscriptionOwner: mocks.useIsSubscriptionOwner,
}))

describe('SettingsSubscription', () => {
  cleanUpAfterEach()

  it('renders loading', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({ data: false, isLoading: true })
    mocks.useIsSubscriptionOwner.mockReturnValueOnce({ data: false, isLoading: true })

    render(
      <MockAppProvider>
        <SettingsSubscription />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(Loading.TestId)).toBeInTheDocument()
  })

  it('renders pricing for users without an active subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({ data: false, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsSubscription />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(MockTestIds.Pricing)).toBeInTheDocument()
  })

  it('renders managed subscription section for users with a managed subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useIsSubscriptionOwner.mockReturnValueOnce({
      data: false,
      isLoading: false,
    })

    render(
      <MockAppProvider>
        <SettingsSubscription />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(MockTestIds.ManagedSubscriptionSection)).toBeInTheDocument()
  })

  it('renders the subscription details for users with an owned subscription', () => {
    mocks.useHasActiveSubscription.mockReturnValueOnce({ data: true, isLoading: false })
    mocks.useIsSubscriptionOwner.mockReturnValueOnce({
      data: true,
      isLoading: false,
    })

    render(
      <MockAppProvider>
        <SettingsSubscription />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(MockTestIds.SubscriptionDetailsSection)).toBeInTheDocument()
    expect(screen.getByTestId(MockTestIds.SubscriptionSeatsSection)).toBeInTheDocument()
  })
})
