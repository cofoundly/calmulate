import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useIsSubscriptionOwner } from '@/billing/hooks/useIsSubscriptionOwner'
import { useSubscriptionInfo } from '@/billing/hooks/useSubscriptionInfo'
import { makeSubscriptionInfo } from '@/billing/mocks/makeSubscriptionInfo'
import { routes } from '@/router/routes'
import { useTeam } from '@/teams/hooks/useTeam'
import { makeTeamWithMembers } from '@/teams/mocks/makeTeamWithMembers'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { SettingsInviteTeamMembers } from '.'

enum MockTestIds {
  SettingsTeamsBreadcrumbs = 'settingsTeamsBreadcrumbs',
}

// mock the components so that we don't have to mock the entire firebase
vi.mock(
  '@/components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs',
  vi.fn(() => ({
    SettingsTeamsBreadcrumbs: () => <div data-testid={MockTestIds.SettingsTeamsBreadcrumbs} />,
  })),
)

const mocks = vi.hoisted(() => {
  return {
    useTeam: vi.fn<any, Partial<ReturnType<typeof useTeam>>>(() => ({ data: undefined, isLoading: false })),
    useSubscriptionInfo: vi.fn<any, Partial<ReturnType<typeof useSubscriptionInfo>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useIsSubscriptionOwner: vi.fn<any, Partial<ReturnType<typeof useIsSubscriptionOwner>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    inviteTeamMembers: vi.fn(),
    navigate: vi.fn(),
  }
})

vi.mock('@/teams/hooks/useTeam', () => ({
  useTeam: mocks.useTeam,
}))

vi.mock('@/billing/hooks/useSubscriptionInfo', () => ({
  useSubscriptionInfo: mocks.useSubscriptionInfo,
}))

vi.mock('@/billing/hooks/useIsSubscriptionOwner', () => ({
  useIsSubscriptionOwner: mocks.useIsSubscriptionOwner,
}))

vi.mock('@/teams/hooks/useInviteTeamMember', () => ({
  useInviteTeamMembers: () => ({
    mutate: mocks.inviteTeamMembers,
  }),
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

const getBuyMoreButton = () => screen.getByRole('button', { name: 'Buy more' })
const getInput = () => screen.getByPlaceholderText('Enter email address')
const getSendInvitesButton = () => screen.getByRole('button', { name: 'Send invites' })

describe('SettingsInviteTeamMembers', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <SettingsInviteTeamMembers />
      </MockAppProvider>,
    )

    expect(screen.getByText('Invite team members')).toBeInTheDocument()
  })

  it('disables the input and send invite button when loading', () => {
    mocks.useTeam.mockReturnValue({ data: makeTeamWithMembers({ team: {}, members: [] }), isLoading: true })
    mocks.useSubscriptionInfo.mockReturnValue(
      // @ts-expect-error FIXME: mock types seem to be incorrect
      {
        data: makeSubscriptionInfo({ availableSeats: 1 }),
        isLoading: true,
      },
    )
    mocks.useIsSubscriptionOwner.mockReturnValue({ data: true, isLoading: true })

    render(
      <MockAppProvider>
        <SettingsInviteTeamMembers />
      </MockAppProvider>,
    )

    expect(getInput()).toBeDisabled()
    expect(getSendInvitesButton()).toBeDisabled()
  })

  it('disables the input when there are no available seats', () => {
    mocks.useTeam.mockReturnValue({ data: makeTeamWithMembers({ team: {}, members: [] }), isLoading: false })
    mocks.useSubscriptionInfo.mockReturnValue({ data: makeSubscriptionInfo({ availableSeats: 0 }), isLoading: false })
    mocks.useIsSubscriptionOwner.mockReturnValue({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsInviteTeamMembers />
      </MockAppProvider>,
    )

    expect(getInput()).toBeDisabled()
  })

  it('disables the send invites button when there are no new emails', () => {
    mocks.useTeam.mockReturnValue({ data: makeTeamWithMembers({ team: {}, members: [] }), isLoading: false })
    mocks.useSubscriptionInfo.mockReturnValue({ data: makeSubscriptionInfo({ availableSeats: 1 }), isLoading: false })

    render(
      <MockAppProvider>
        <SettingsInviteTeamMembers />
      </MockAppProvider>,
    )

    expect(getSendInvitesButton()).toBeDisabled()
  })

  it('does not allow the addition of invalid emails', () => {
    mocks.useTeam.mockReturnValue({ data: makeTeamWithMembers({ team: {}, members: [] }), isLoading: false })
    mocks.useSubscriptionInfo.mockReturnValue({ data: makeSubscriptionInfo({ availableSeats: 1 }), isLoading: false })

    render(
      <MockAppProvider>
        <SettingsInviteTeamMembers />
      </MockAppProvider>,
    )

    const input = getInput()

    const email = 'frank.gallagher'
    fireEvent.change(input, { target: { value: email } })
    fireEvent.keyDown(input, { key: 'Enter' })

    // expect the input not to have been cleared
    expect(input).toHaveValue(email)

    // expect the email to not have been added to the list
    expect(screen.queryByRole('button', { name: email })).not.toBeInTheDocument()

    // expect the send invites button to be disabled
    expect(getSendInvitesButton()).toBeDisabled()
  })

  it('adds emails, removes emails and sends invites', () => {
    const teamId = 'team-1'
    mocks.useTeam.mockReturnValue({
      data: makeTeamWithMembers({ team: { id: teamId }, members: [] }),
      isLoading: false,
    })
    mocks.useSubscriptionInfo.mockReturnValue({ data: makeSubscriptionInfo({ availableSeats: 1 }), isLoading: false })

    render(
      <MockAppProvider>
        <SettingsInviteTeamMembers />
      </MockAppProvider>,
    )

    const input = getInput()

    const email = 'frank.gallagher@gmail.com'
    fireEvent.change(input, { target: { value: email } })
    fireEvent.keyDown(input, { key: 'Enter' })

    // expect the input to have been cleared
    expect(input).toHaveValue('')

    // expect the email to have been added to the list
    expect(screen.getByRole('button', { name: email })).toBeInTheDocument()

    // expect the send invites button to be enabled
    expect(getSendInvitesButton()).not.toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: email }))

    // expect the email to have been removed from the list
    expect(screen.queryByRole('button', { name: email })).not.toBeInTheDocument()

    // expect the send invites button to be disabled
    expect(getSendInvitesButton()).toBeDisabled()

    // let's add the email back
    fireEvent.change(input, { target: { value: email } })
    fireEvent.keyDown(input, { key: 'Enter' })

    fireEvent.click(getSendInvitesButton())

    // expect the inviteTeamMembers mutation to have been called
    expect(mocks.inviteTeamMembers).toHaveBeenCalledWith({
      teamId,
      emails: [email],
      signUpUrl: `${window.location.origin}${routes.signUp}`,
    })
  })

  it('disables the Buy more button for non-subscription owners', () => {
    mocks.useTeam.mockReturnValue({ data: makeTeamWithMembers({ team: {}, members: [] }), isLoading: false })
    mocks.useSubscriptionInfo.mockReturnValue({ data: makeSubscriptionInfo({ availableSeats: 1 }), isLoading: false })
    mocks.useIsSubscriptionOwner.mockReturnValue({ data: false, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsInviteTeamMembers />
      </MockAppProvider>,
    )

    expect(getBuyMoreButton()).toBeDisabled()
  })

  it('allows subscription owners to buy more seats', () => {
    mocks.useTeam.mockReturnValue({ data: makeTeamWithMembers({ team: {}, members: [] }), isLoading: false })
    mocks.useSubscriptionInfo.mockReturnValue({ data: makeSubscriptionInfo({ availableSeats: 1 }), isLoading: false })
    mocks.useIsSubscriptionOwner.mockReturnValue({ data: true, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsInviteTeamMembers />
      </MockAppProvider>,
    )

    expect(getBuyMoreButton()).toBeInTheDocument()

    fireEvent.click(getBuyMoreButton())

    expect(mocks.navigate).toHaveBeenCalledWith(routes.settingsSubscription)
  })
})
