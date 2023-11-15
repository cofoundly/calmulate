import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { TeamMemberRole } from 'types'
import { formatTeamMemberRole } from 'utils'
import { describe, expect, it, vi } from 'vitest'

import { useIsTeamMemberLastAdmin } from '@/teams/hooks/useIsTeamMemberLastAdmin'
import { useTeamMember } from '@/teams/hooks/useTeamMember'
import { makeTeamMember } from '@/teams/mocks/makeTeamMember'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { ChangeTeamMemberRoleSection } from './ChangeTeamMemberRoleSection'

const mocks = vi.hoisted(() => {
  return {
    useIsTeamMemberLastAdmin: vi.fn<any, Partial<ReturnType<typeof useIsTeamMemberLastAdmin>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useTeamMember: vi.fn<any, Partial<ReturnType<typeof useTeamMember>>>(() => ({ data: undefined, isLoading: false })),
    updateTeamMemberRole: vi.fn(),
  }
})

vi.mock('@/teams/hooks/useIsTeamMemberLastAdmin', () => ({
  useIsTeamMemberLastAdmin: mocks.useIsTeamMemberLastAdmin,
}))

vi.mock('@/teams/hooks/useTeamMember', () => ({
  useTeamMember: mocks.useTeamMember,
}))

vi.mock('@/teams/hooks/useUpdateTeamMemberRole', () => ({
  useUpdateTeamMemberRole: () => ({
    mutate: mocks.updateTeamMemberRole,
  }),
}))

const getSelect = (role: TeamMemberRole) => screen.getByRole('button', { name: formatTeamMemberRole(role) })
const getSaveButton = () => screen.getByRole('button', { name: 'Save' })

describe('ChangeTeamMemberRoleSection', () => {
  cleanUpAfterEach()

  it('renders', async () => {
    const role = TeamMemberRole.Admin
    mocks.useTeamMember.mockReturnValue({ data: makeTeamMember({ role }) })

    render(
      <MockAppProvider>
        <ChangeTeamMemberRoleSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Change role')).toBeInTheDocument()
    expect(getSelect(role)).toBeInTheDocument()
  })

  it('disables the select if the user is the last team admin', () => {
    const role = TeamMemberRole.Admin
    mocks.useTeamMember.mockReturnValue({ data: makeTeamMember({ role }) })
    mocks.useIsTeamMemberLastAdmin.mockReturnValue({ data: true })

    render(
      <MockAppProvider>
        <ChangeTeamMemberRoleSection />
      </MockAppProvider>,
    )

    expect(getSelect(role)).toBeDisabled()
  })

  it('disables the submit button if the user is not a team admin', () => {
    const role = TeamMemberRole.Member
    mocks.useTeamMember.mockReturnValue({ data: makeTeamMember({ role }) })
    mocks.useIsTeamMemberLastAdmin.mockReturnValue({ data: false })

    render(
      <MockAppProvider>
        <ChangeTeamMemberRoleSection />
      </MockAppProvider>,
    )

    expect(getSaveButton()).toBeDisabled()
  })

  it('updates the team member role', () => {
    const teamMemberId = 'member-1'
    const teamId = 'team-1'
    const role = TeamMemberRole.Member
    mocks.useTeamMember.mockReturnValue({ data: makeTeamMember({ id: teamMemberId, teamId, role }) })

    render(
      <MockAppProvider>
        <ChangeTeamMemberRoleSection />
      </MockAppProvider>,
    )

    fireEvent.click(getSelect(role))

    // click the Admin menu item
    const newRole = TeamMemberRole.Admin
    fireEvent.click(screen.getByRole('button', { name: formatTeamMemberRole(newRole) }))

    fireEvent.click(getSaveButton())

    expect(mocks.updateTeamMemberRole).toHaveBeenCalledWith({
      teamId,
      teamMemberId,
      role: newRole,
    })
  })
})
