import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { routes } from '@/router/routes'
import { useTeam } from '@/teams/hooks/useTeam'
import { useTeamMember } from '@/teams/hooks/useTeamMember'
import { makeTeamMember } from '@/teams/mocks/makeTeamMember'
import { makeTeamWithMembers } from '@/teams/mocks/makeTeamWithMembers'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { SettingsRemoveTeamMember } from '.'

const mocks = vi.hoisted(() => {
  return {
    useTeam: vi.fn<any, Partial<ReturnType<typeof useTeam>>>(() => ({ data: undefined, isLoading: false })),
    useTeamMember: vi.fn<any, Partial<ReturnType<typeof useTeamMember>>>(() => ({ data: undefined, isLoading: false })),
    removeTeamMember: vi.fn(),
    navigate: vi.fn(),
  }
})

vi.mock('@/teams/hooks/useTeam', () => ({
  useTeam: mocks.useTeam,
}))

vi.mock('@/teams/hooks/useTeamMember', () => ({
  useTeamMember: mocks.useTeamMember,
}))

vi.mock('@/teams/hooks/useRemoveTeamMember', () => ({
  useRemoveTeamMember: () => ({
    mutate: mocks.removeTeamMember,
  }),
}))

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

const getCancelButton = () => screen.getByRole('button', { name: 'Cancel' })
const getConfirmButton = () => screen.getByRole('button', { name: 'Confirm' })

describe('SettingsRemoveTeamMember', () => {
  cleanUpAfterEach()

  it('renders', async () => {
    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    expect(screen.getByText('Remove team member')).toBeInTheDocument()
  })

  it('navigates back on cancel', () => {
    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    fireEvent.click(getCancelButton())

    expect(mocks.navigate).toHaveBeenCalledWith(routes.back)
  })

  it('removes a team member', () => {
    const teamId = '1'
    const teamMemberId = 'member-1'

    mocks.useTeamMember.mockReturnValueOnce({ data: makeTeamMember({ id: teamMemberId, teamId }), isLoading: false })
    mocks.useTeam.mockReturnValueOnce({
      data: makeTeamWithMembers({ team: { id: teamId }, members: [{ id: teamMemberId, teamId }] }),
      isLoading: false,
    })

    render(
      <MockAppProvider>
        <SettingsRemoveTeamMember />
      </MockAppProvider>,
    )

    fireEvent.click(getConfirmButton())

    expect(mocks.removeTeamMember).toHaveBeenCalledWith({
      teamId,
      teamMemberId,
    })
  })
})
