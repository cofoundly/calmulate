import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { useHasTeamPlan } from '@/billing/hooks/useHasTeamPlan'
import { features } from '@/features'
import { useTeams } from '@/teams/hooks/useTeams'
import { makeTeamWithMembers } from '@/teams/mocks/makeTeamWithMembers'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { SettingsNavbar } from './SettingsNavbar'

const mocks = vi.hoisted(() => ({
  useHasActiveSubscription: vi.fn<any, Partial<ReturnType<typeof useHasActiveSubscription>>>(() => ({
    data: undefined,
    isLoading: false,
  })),
  useHasTeamPlan: vi.fn<any, Partial<ReturnType<typeof useHasTeamPlan>>>(() => ({ data: undefined, isLoading: false })),
  useTeams: vi.fn<any, Partial<ReturnType<typeof useTeams>>>(() => ({ data: undefined, isLoading: false })),
  signOut: vi.fn(),
  navigate: vi.fn(),
}))

vi.mock('@/billing/hooks/useHasActiveSubscription', () => ({
  useHasActiveSubscription: mocks.useHasActiveSubscription,
}))

vi.mock('@/billing/hooks/useHasTeamPlan', () => ({
  useHasTeamPlan: mocks.useHasTeamPlan,
}))

vi.mock('@/teams/hooks/useTeams', () => ({
  useTeams: mocks.useTeams,
}))

vi.mock('@/auth/hooks/useSignOut', () => ({
  useSignOut: () => ({
    mutate: mocks.signOut,
  }),
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

describe('SettingsNavbar', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <SettingsNavbar />
      </MockAppProvider>,
    )

    if (features.auth) {
      expect(screen.getByRole('button', { name: 'Account' })).toBeInTheDocument()
    } else {
      expect(screen.queryByRole('button', { name: 'Account' })).not.toBeInTheDocument()
    }
  })

  if (features.auth) {
    it('signs a user out', () => {
      render(
        <MockAppProvider>
          <SettingsNavbar />
        </MockAppProvider>,
      )

      fireEvent.click(screen.getByRole('button', { name: 'Sign out' }))

      expect(mocks.signOut).toHaveBeenCalled()
    })
  }

  if (features.subscriptions) {
    it('enables the subscription page if user has an active subscription', () => {
      mocks.useHasActiveSubscription.mockReturnValue({ data: true, isLoading: false })

      render(
        <MockAppProvider>
          <SettingsNavbar />
        </MockAppProvider>,
      )

      expect(screen.getByRole('button', { name: 'Subscription' })).toBeEnabled()
    })
  }

  if (features.subscriptions && features.teams) {
    it('disables the teams page if the active subscription is loading or the team plan is loading or if there is no default team id', () => {
      mocks.useHasActiveSubscription.mockReturnValue({ data: true, isLoading: false })
      mocks.useHasTeamPlan.mockReturnValue({ data: false, isLoading: false })
      mocks.useTeams.mockReturnValue({ data: [], isLoading: false })

      render(
        <MockAppProvider>
          <SettingsNavbar />
        </MockAppProvider>,
      )

      expect(screen.getByRole('button', { name: 'Team' })).toBeDisabled()
    })

    it('disables the teams page if user does not have an active subscription and is not on the team plan', () => {
      mocks.useHasActiveSubscription.mockReturnValue({ data: false, isLoading: false })
      mocks.useHasTeamPlan.mockReturnValue({ data: false, isLoading: false })
      mocks.useTeams.mockReturnValue({ data: [], isLoading: false })

      render(
        <MockAppProvider>
          <SettingsNavbar />
        </MockAppProvider>,
      )

      expect(screen.getByRole('button', { name: 'Team' })).toBeDisabled()
    })

    it('enables the teams page if user has an active subscription and is on the team plan and has a default team id', () => {
      mocks.useHasActiveSubscription.mockReturnValue({ data: true, isLoading: false })
      mocks.useHasTeamPlan.mockReturnValue({ data: true, isLoading: false })
      mocks.useTeams.mockReturnValue({ data: [makeTeamWithMembers({ team: {}, members: [] })], isLoading: false })

      render(
        <MockAppProvider>
          <SettingsNavbar />
        </MockAppProvider>,
      )

      expect(screen.getByRole('button', { name: 'Team' })).toBeEnabled()
    })
  }
})
