import { Button, SkeletonLoader, Table } from 'components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatTeamMemberName, formatTeamMemberRole, formatTeamMemberStatus } from 'utils'

import { PageSection } from '@/components/pageSection/PageSection'
import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '@/router/routes'
import { useIsLoggedInUserTeamAdmin } from '@/teams/hooks/useIsLoggedInUserTeamAdmin'
import { useTeam } from '@/teams/hooks/useTeam'

export const ManageTeamMembersSection = () => {
  const { data: isLoggedInUserTeamAdmin, isLoading: isLoggedInUserTeamAdminLoading } = useIsLoggedInUserTeamAdmin()
  const { data: team, isLoading: isTeamLoading } = useTeam()

  const navigate = useNavigate()

  const loading = isLoggedInUserTeamAdminLoading || isTeamLoading
  const disabled = !isLoggedInUserTeamAdmin || loading

  return (
    <PageSection
      title={isLoggedInUserTeamAdmin ? 'Manage team members' : 'View team members'}
      description={
        isLoggedInUserTeamAdmin
          ? 'Add, update or remove team members from your team.'
          : 'View team members in your team.'
      }
      action={
        <Button
          disabled={disabled}
          onClick={() => {
            if (team) {
              navigate(routes.settingsInviteTeamMembers.replace(TEAM_ID_PARAM, team.id))
            }
          }}
        >
          Invite team members
        </Button>
      }
      fullWidth
    >
      <Table className="max-h-[20rem]">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>

            <Table.HeaderCell>Email</Table.HeaderCell>

            <Table.HeaderCell>Status</Table.HeaderCell>

            <Table.HeaderCell>Role</Table.HeaderCell>

            <Table.HeaderCell>Date added</Table.HeaderCell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {loading ? (
            <Table.Row>
              <Table.Cell>
                <SkeletonLoader />
              </Table.Cell>

              <Table.Cell>
                <SkeletonLoader />
              </Table.Cell>

              <Table.Cell>
                <SkeletonLoader />
              </Table.Cell>

              <Table.Cell>
                <SkeletonLoader />
              </Table.Cell>

              <Table.Cell>
                <SkeletonLoader />
              </Table.Cell>

              <Table.Cell>
                <SkeletonLoader />
              </Table.Cell>
            </Table.Row>
          ) : (
            <>
              {team?.members?.map(teamMember => {
                return (
                  <Table.Row key={teamMember.id}>
                    <Table.Cell>{formatTeamMemberName(teamMember)}</Table.Cell>

                    <Table.Cell>{teamMember.email}</Table.Cell>

                    <Table.Cell>{formatTeamMemberStatus(teamMember.status)}</Table.Cell>

                    <Table.Cell>{formatTeamMemberRole(teamMember.role)}</Table.Cell>

                    <Table.Cell>{formatDate(teamMember.createdAt)}</Table.Cell>

                    <Table.Cell>
                      <Button
                        variant="light"
                        disabled={!isLoggedInUserTeamAdmin}
                        onClick={() => {
                          if (team) {
                            navigate(
                              routes.settingsTeamMember
                                .replace(TEAM_ID_PARAM, team.id.toString())
                                .replace(TEAM_MEMBER_ID_PARAM, teamMember.id.toString()),
                            )
                          }
                        }}
                      >
                        Manage
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </>
          )}
        </Table.Body>
      </Table>
    </PageSection>
  )
}
