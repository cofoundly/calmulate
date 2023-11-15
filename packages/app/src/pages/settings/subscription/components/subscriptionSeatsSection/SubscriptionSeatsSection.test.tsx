import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { makePrice } from 'utils'
import { describe, expect, it, vi } from 'vitest'

import { useHasTeamPlan } from '@/billing/hooks/useHasTeamPlan'
import { usePrices } from '@/billing/hooks/usePrices'
import { useSubscriptionInfo } from '@/billing/hooks/useSubscriptionInfo'
import { makeSubscriptionInfo } from '@/billing/mocks/makeSubscriptionInfo'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { SubscriptionSeatsSection } from './SubscriptionSeatsSection'

const mocks = vi.hoisted(() => {
  return {
    usePrices: vi.fn<any, Partial<ReturnType<typeof usePrices>>>(() => ({ data: undefined, isLoading: false })),
    useHasTeamPlan: vi.fn<any, Partial<ReturnType<typeof useHasTeamPlan>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useSubscriptionInfo: vi.fn<any, Partial<ReturnType<typeof useSubscriptionInfo>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    updateSubscriptionQuantity: vi.fn(),
  }
})

vi.mock('@/billing/hooks/usePrices', () => ({
  usePrices: mocks.usePrices,
}))

vi.mock('@/billing/hooks/useHasTeamPlan', () => ({
  useHasTeamPlan: mocks.useHasTeamPlan,
}))

vi.mock('@/billing/hooks/useSubscriptionInfo', () => ({
  useSubscriptionInfo: mocks.useSubscriptionInfo,
}))

vi.mock('@/billing/hooks/useUpdateSubscriptionQuantity', () => ({
  useUpdateSubscriptionQuantity: () => ({
    mutate: mocks.updateSubscriptionQuantity,
  }),
}))

describe('SubscriptionSeatsSection', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <SubscriptionSeatsSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Subscription seats')).toBeInTheDocument()
  })

  it('does not allow the user to change the number of seats when the plan is not a team plan', () => {
    mocks.useHasTeamPlan.mockReturnValue({ data: false })

    render(
      <MockAppProvider>
        <SubscriptionSeatsSection />
      </MockAppProvider>,
    )

    expect(
      screen.getByText('Adding seats to your subscription is only available on the team plan.'),
    ).toBeInTheDocument()
  })

  it('does not allow the user to change the number of seats below 1', () => {
    const priceId = '1'
    mocks.usePrices.mockReturnValue({
      data: [makePrice({ id: priceId })],
    })
    mocks.useSubscriptionInfo.mockReturnValue({
      data: makeSubscriptionInfo({ priceId, totalSeats: 1, assignedSeats: 1, availableSeats: 0 }),
    })

    render(
      <MockAppProvider>
        <SubscriptionSeatsSection />
      </MockAppProvider>,
    )

    fireEvent.change(screen.getByPlaceholderText('Enter seats'), { target: { value: 0 } })

    expect(screen.getByPlaceholderText('Enter seats')).toHaveValue(1)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not allow the user the change the number of seats below the number of assigned seats', () => {
    const priceId = '1'
    mocks.usePrices.mockReturnValue({
      data: [makePrice({ id: priceId })],
    })
    mocks.useSubscriptionInfo.mockReturnValue({
      data: makeSubscriptionInfo({ priceId, totalSeats: 2, assignedSeats: 2, availableSeats: 0 }),
    })

    render(
      <MockAppProvider>
        <SubscriptionSeatsSection />
      </MockAppProvider>,
    )

    fireEvent.change(screen.getByPlaceholderText('Enter seats'), { target: { value: 1 } })

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('updates the subscription quantity', () => {
    const priceId = '1'
    mocks.usePrices.mockReturnValue({
      data: [makePrice({ id: priceId })],
    })
    mocks.useSubscriptionInfo.mockReturnValue({
      data: makeSubscriptionInfo({ priceId, totalSeats: 1, assignedSeats: 1, availableSeats: 0 }),
    })

    render(
      <MockAppProvider>
        <SubscriptionSeatsSection />
      </MockAppProvider>,
    )

    fireEvent.change(screen.getByPlaceholderText('Enter seats'), { target: { value: 2 } })

    fireEvent.click(screen.getByRole('button'))

    expect(mocks.updateSubscriptionQuantity).toHaveBeenCalledWith(2)
  })
})
