import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useIsLoggedInUserTeamAdmin } from '@/teams/hooks/useIsLoggedInUserTeamAdmin'
import { useTeam } from '@/teams/hooks/useTeam'
import { makeTeamWithMembers } from '@/teams/mocks/makeTeamWithMembers'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { ChangeTeamNameSection } from './ChangeTeamNameSection'

const mocks = vi.hoisted(() => {
  return {
    useIsLoggedInUserTeamAdmin: vi.fn<any, Partial<ReturnType<typeof useIsLoggedInUserTeamAdmin>>>(() => ({
      data: undefined,
      isLoading: false,
    })),
    useTeam: vi.fn<any, Partial<ReturnType<typeof useTeam>>>(() => ({ data: undefined, isLoading: false })),
    updateTeam: vi.fn(),
  }
})

vi.mock('@/teams/hooks/useIsLoggedInUserTeamAdmin', () => ({
  useIsLoggedInUserTeamAdmin: mocks.useIsLoggedInUserTeamAdmin,
}))

vi.mock('@/teams/hooks/useTeam', () => ({
  useTeam: mocks.useTeam,
}))

vi.mock('@/teams/hooks/useUpdateTeam', () => ({
  useUpdateTeam: () => ({
    mutate: mocks.updateTeam,
  }),
}))

const getInput = () => screen.getByPlaceholderText('Enter a team name...')
const getButton = () => screen.getByRole('button', { name: 'Save' })

describe('ChangeTeamNameSection', () => {
  cleanUpAfterEach()

  it('renders', () => {
    const teamName = 'Team 1'
    mocks.useTeam.mockReturnValue({ data: makeTeamWithMembers({ team: { name: teamName }, members: [] }) })

    render(
      <MockAppProvider>
        <ChangeTeamNameSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Change team name')).toBeInTheDocument()
    expect(getInput()).toHaveValue(teamName)
  })

  it('disables the input if the user is not a team admin', () => {
    mocks.useIsLoggedInUserTeamAdmin.mockReturnValue({ data: false })

    render(
      <MockAppProvider>
        <ChangeTeamNameSection />
      </MockAppProvider>,
    )

    expect(getInput()).toBeDisabled()
  })

  it('disables the submit button if the team name is blank', () => {
    render(
      <MockAppProvider>
        <ChangeTeamNameSection />
      </MockAppProvider>,
    )

    fireEvent.change(getInput(), { target: { value: '' } })

    expect(getButton()).toBeDisabled()
  })

  it('disables the submit button if the team name did not change', () => {
    const teamName = 'Team 1'
    mocks.useTeam.mockReturnValue({ data: makeTeamWithMembers({ team: { name: teamName }, members: [] }) })

    render(
      <MockAppProvider>
        <ChangeTeamNameSection />
      </MockAppProvider>,
    )

    fireEvent.change(getInput(), { target: { value: teamName } })

    expect(getButton()).toBeDisabled()
  })

  it('updates the team', () => {
    const teamId = '1'
    const teamName = 'Team 1'
    mocks.useTeam.mockReturnValue({ data: makeTeamWithMembers({ team: { name: teamName }, members: [] }) })

    render(
      <MockAppProvider>
        <ChangeTeamNameSection />
      </MockAppProvider>,
    )

    const newTeamName = 'Team 2'
    fireEvent.change(getInput(), { target: { value: newTeamName } })

    fireEvent.click(getButton())

    expect(mocks.updateTeam).toHaveBeenCalledWith({ id: teamId, name: newTeamName })
  })
})
