import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '@/router/routes'
import { useIsTeamMemberLastAdmin } from '@/teams/hooks/useIsTeamMemberLastAdmin'
import { useTeamMember } from '@/teams/hooks/useTeamMember'
import { makeTeamMember } from '@/teams/mocks/makeTeamMember'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { RemoveTeamMemberSection } from './RemoveTeamMemberSection'

const mocks = vi.hoisted(() => {
  return {
    useIsTeamMemberLastAdmin: vi.fn<any, Partial<ReturnType<typeof useIsTeamMemberLastAdmin>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useTeamMember: vi.fn<any, Partial<ReturnType<typeof useTeamMember>>>(() => ({ data: undefined, isLoading: false })),
    navigate: vi.fn(),
  }
})

vi.mock('@/teams/hooks/useIsTeamMemberLastAdmin', () => ({
  useIsTeamMemberLastAdmin: mocks.useIsTeamMemberLastAdmin,
}))

vi.mock('@/teams/hooks/useTeamMember', () => ({
  useTeamMember: mocks.useTeamMember,
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

const getButton = () => screen.getByRole('button', { name: 'Yes, remove team member' })

describe('RemoveTeamMemberSection', () => {
  cleanUpAfterEach()

  it('renders', async () => {
    render(
      <MockAppProvider>
        <RemoveTeamMemberSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Remove team member')).toBeInTheDocument()
  })

  it('disables the button if the team member is the last admin of the team', () => {
    mocks.useIsTeamMemberLastAdmin.mockReturnValue({ data: true })

    render(
      <MockAppProvider>
        <RemoveTeamMemberSection />
      </MockAppProvider>,
    )

    expect(getButton()).toBeDisabled()
  })

  it('navigates to the confirm remove team member page', () => {
    const teamId = 'team-1'
    const teamMemberId = 'member-1'
    mocks.useTeamMember.mockReturnValue({ data: makeTeamMember({ teamId, id: teamMemberId }) })
    mocks.useIsTeamMemberLastAdmin.mockReturnValue({ data: false })

    render(
      <MockAppProvider>
        <RemoveTeamMemberSection />
      </MockAppProvider>,
    )

    fireEvent.click(getButton())

    expect(mocks.navigate).toHaveBeenCalledWith(
      routes.settingsRemoveTeamMember.replace(TEAM_ID_PARAM, teamId).replace(TEAM_MEMBER_ID_PARAM, teamMemberId),
    )
  })
})
