import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { TeamMemberRole } from 'types'
import { describe, expect, it, vi } from 'vitest'

import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '@/router/routes'
import { useIsLoggedInUserTeamAdmin } from '@/teams/hooks/useIsLoggedInUserTeamAdmin'
import { useTeam } from '@/teams/hooks/useTeam'
import { makeTeamWithMembers } from '@/teams/mocks/makeTeamWithMembers'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { ManageTeamMembersSection } from './ManageTeamMembersSection'

const mocks = vi.hoisted(() => {
  return {
    useIsLoggedInUserTeamAdmin: vi.fn<any, Partial<ReturnType<typeof useIsLoggedInUserTeamAdmin>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useTeam: vi.fn<any, Partial<ReturnType<typeof useTeam>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    navigate: vi.fn(),
  }
})

vi.mock('@/teams/hooks/useIsLoggedInUserTeamAdmin', () => ({
  useIsLoggedInUserTeamAdmin: mocks.useIsLoggedInUserTeamAdmin,
}))

vi.mock('@/teams/hooks/useTeam', () => ({
  useTeam: mocks.useTeam,
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

const getInviteButton = () => screen.getByRole('button', { name: 'Invite team members' })

describe('ManageTeamMembersSection', () => {
  cleanUpAfterEach()

  it('renders the non-admin state', () => {
    mocks.useIsLoggedInUserTeamAdmin.mockReturnValueOnce({ data: false })

    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: {}, members: [{ role: TeamMemberRole.Member }] }),
    })

    render(
      <MockAppProvider>
        <ManageTeamMembersSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('View team members')).toBeInTheDocument()
    expect(getInviteButton()).toBeDisabled()
    expect(screen.queryByRole('button', { name: 'Manage' })).toBeDisabled()
  })

  it('renders the admin state', () => {
    mocks.useIsLoggedInUserTeamAdmin.mockReturnValueOnce({ data: true })

    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: {}, members: [{ role: TeamMemberRole.Member }] }),
    })

    render(
      <MockAppProvider>
        <ManageTeamMembersSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Manage team members')).toBeInTheDocument()
    expect(getInviteButton()).toBeEnabled()
    expect(screen.queryByRole('button', { name: 'Manage' })).toBeEnabled()
  })

  it('navigates to the invite team members page', () => {
    mocks.useIsLoggedInUserTeamAdmin.mockReturnValueOnce({ data: true })

    const teamId = '1'
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: { id: teamId }, members: [] }),
    })

    render(
      <MockAppProvider>
        <ManageTeamMembersSection />
      </MockAppProvider>,
    )

    fireEvent.click(getInviteButton())

    expect(mocks.navigate).toHaveBeenCalledWith(routes.settingsInviteTeamMembers.replace(TEAM_ID_PARAM, teamId))
  })

  it('navigates to the manage team member page', () => {
    mocks.useIsLoggedInUserTeamAdmin.mockReturnValueOnce({ data: true })

    const teamId = '1'
    const teamMemberId = '1'
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({
        team: {
          id: teamId,
        },
        members: [
          {
            id: teamMemberId,
            role: TeamMemberRole.Member,
          },
        ],
      }),
    })

    render(
      <MockAppProvider>
        <ManageTeamMembersSection />
      </MockAppProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Manage' }))

    expect(mocks.navigate).toHaveBeenCalledWith(
      routes.settingsTeamMember.replace(TEAM_ID_PARAM, teamId).replace(TEAM_MEMBER_ID_PARAM, teamMemberId),
    )
  })
})
