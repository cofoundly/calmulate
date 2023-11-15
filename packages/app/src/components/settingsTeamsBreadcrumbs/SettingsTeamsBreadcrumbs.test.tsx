import { render, screen } from '@testing-library/react'
import { SkeletonLoader } from 'components'
import React from 'react'
import { formatTeamMemberName } from 'utils'
import { describe, expect, it, vi } from 'vitest'

import { useTeam } from '@/teams/hooks/useTeam'
import { useTeamMember } from '@/teams/hooks/useTeamMember'
import { makeTeamMember } from '@/teams/mocks/makeTeamMember'
import { makeTeamWithMembers } from '@/teams/mocks/makeTeamWithMembers'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { SettingsTeamsBreadcrumbs } from './SettingsTeamsBreadcrumbs'

const mocks = vi.hoisted(() => ({
  useTeam: vi.fn<any, Partial<ReturnType<typeof useTeam>>>(() => ({ data: undefined, isLoading: false })),
  useTeamMember: vi.fn<any, Partial<ReturnType<typeof useTeamMember>>>(() => ({ data: undefined, isLoading: false })),
  navigate: vi.fn(),
}))

vi.mock('@/teams/hooks/useTeam', () => ({
  useTeam: mocks.useTeam,
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

describe('SettingsTeamsBreadcrumbs', () => {
  cleanUpAfterEach()

  it('renders the loading state', () => {
    mocks.useTeam.mockReturnValue({ data: undefined, isLoading: true })
    mocks.useTeamMember.mockReturnValue({ data: undefined, isLoading: true })

    render(
      <MockAppProvider>
        <SettingsTeamsBreadcrumbs />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(SkeletonLoader.TestId)).toBeInTheDocument()
  })

  it('renders the team', () => {
    const teamName = 'A team'
    mocks.useTeam.mockReturnValue({
      data: makeTeamWithMembers({ team: { name: teamName }, members: [] }),
      isLoading: false,
    })
    mocks.useTeamMember.mockReturnValue({ data: undefined, isLoading: false })

    render(
      <MockAppProvider>
        <SettingsTeamsBreadcrumbs />
      </MockAppProvider>,
    )

    expect(screen.getByText(teamName)).toBeInTheDocument()
  })

  it('renders the team member', () => {
    const teamMemberFirstName = 'Frank'
    const teamMemberLastName = 'Gallagher'
    mocks.useTeam.mockReturnValue({
      data: makeTeamWithMembers({
        team: {},
        members: [],
      }),
      isLoading: false,
    })
    mocks.useTeamMember.mockReturnValue({
      data: makeTeamMember({ firstName: teamMemberFirstName, lastName: teamMemberLastName }),
      isLoading: false,
    })

    render(
      <MockAppProvider>
        <SettingsTeamsBreadcrumbs />
      </MockAppProvider>,
    )

    expect(
      screen.getByText(formatTeamMemberName({ firstName: teamMemberFirstName, lastName: teamMemberLastName })),
    ).toBeInTheDocument()
  })
})
