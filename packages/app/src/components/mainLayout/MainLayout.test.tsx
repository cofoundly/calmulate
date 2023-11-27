import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { features } from '@/features'
import { routes } from '@/router/routes'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { MainLayout } from './MainLayout'

const mocks = vi.hoisted(() => ({
  useHasActiveSubscription: vi.fn<any, Partial<ReturnType<typeof useHasActiveSubscription>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  navigate: vi.fn(),
}))

vi.mock('@/billing/hooks/useHasActiveSubscription', () => ({
  useHasActiveSubscription: mocks.useHasActiveSubscription,
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

const getDashboardButton = () => screen.getByRole('button', { name: 'Dashboard' })

describe('MainLayout', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <MainLayout />
      </MockAppProvider>,
    )

    expect(getDashboardButton()).toBeInTheDocument()
  })

  if (features.subscriptions) {
    it('disables the Dashboard button if loading the active subscription', () => {
      mocks.useHasActiveSubscription.mockReturnValue({ data: false, isLoading: false })

      render(
        <MockAppProvider>
          <MainLayout />
        </MockAppProvider>,
      )

      expect(getDashboardButton()).toBeDisabled()
    })

    it('disables the Dashboard button if the user does not have an active subscription', () => {
      mocks.useHasActiveSubscription.mockReturnValue({ data: false, isLoading: false })

      render(
        <MockAppProvider>
          <MainLayout />
        </MockAppProvider>,
      )

      expect(getDashboardButton()).toBeDisabled()
    })
  }

  it('navigates to the Settings page when the Settings button is clicked', () => {
    mocks.useHasActiveSubscription.mockReturnValue({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <MainLayout />
      </MockAppProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Settings' }))

    expect(mocks.navigate).toHaveBeenCalledWith(routes.settings)
  })
})
