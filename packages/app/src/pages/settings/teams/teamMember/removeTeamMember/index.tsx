import { Dialog } from 'components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatTeamMemberName } from 'utils'

import { routes } from '@/router/routes'
import { useRemoveTeamMember } from '@/teams/hooks/useRemoveTeamMember'
import { useTeam } from '@/teams/hooks/useTeam'
import { useTeamMember } from '@/teams/hooks/useTeamMember'

export const SettingsRemoveTeamMember = () => {
  const { data: team, isLoading: teamLoading } = useTeam()
  const { data: teamMember, isLoading: teamMemberLoading } = useTeamMember()

  const { mutate: removeTeamMember, isLoading: removeTeamMemberLoading } = useRemoveTeamMember()
  const navigate = useNavigate()

  const isLoading = teamLoading || teamMemberLoading
  const disabled = isLoading

  return (
    <Dialog
      open
      onClose={() => {
        navigate(routes.back)
      }}
    >
      <Dialog.Header
        title="Remove team member"
        description={`Are you sure you want to remove ${
          formatTeamMemberName(teamMember) || teamMember?.email
        } from the ${team?.name} team? This action cannot be undone.`}
      />

      <Dialog.Actions
        confirmDisabled={disabled}
        confirmLoading={removeTeamMemberLoading}
        confirmIsDangerous
        onCancelClick={() => {
          navigate(routes.back)
        }}
        onConfirmClick={() => {
          if (team?.id && teamMember) {
            removeTeamMember({
              teamId: teamMember.teamId,
              teamMemberId: teamMember.id,
            })
          }
        }}
      />
    </Dialog>
  )
}
