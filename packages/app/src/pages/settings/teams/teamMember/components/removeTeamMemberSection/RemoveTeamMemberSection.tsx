import { Alert, Button, SkeletonLoader } from 'components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { PageSection } from '@/components/pageSection/PageSection'
import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '@/router/routes'
import { useIsTeamMemberLastAdmin } from '@/teams/hooks/useIsTeamMemberLastAdmin'
import { useTeamMember } from '@/teams/hooks/useTeamMember'

export const RemoveTeamMemberSection = () => {
  const { data: teamMember, isLoading: teamMemberLoading } = useTeamMember()
  const { data: isTeamMemberLastAdmin, isLoading: isTeamMemberLastAdminLoading } = useIsTeamMemberLastAdmin()

  const navigate = useNavigate()

  const isLoading = teamMemberLoading || isTeamMemberLastAdminLoading
  const disabled = isLoading || isTeamMemberLastAdmin

  return (
    <PageSection
      className="border-b-0"
      title="Remove team member"
      description="Remove this team member from your team. This action cannot be undone."
    >
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {isTeamMemberLastAdmin && (
            <Alert variant="info">
              You are the last admin of the team and there are other team members. To remove yourself from the team,
              first assign another team member as admin.
            </Alert>
          )}

          <div>
            <Button
              color="red"
              disabled={disabled}
              onClick={() => {
                if (teamMember) {
                  navigate(
                    routes.settingsRemoveTeamMember
                      .replace(TEAM_ID_PARAM, teamMember.teamId)
                      .replace(TEAM_MEMBER_ID_PARAM, teamMember.id),
                  )
                }
              }}
            >
              Yes, remove team member
            </Button>
          </div>
        </>
      )}
    </PageSection>
  )
}
