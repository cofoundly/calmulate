import React from 'react'
import { Outlet } from 'react-router-dom'

import { SettingsTeamsBreadcrumbs } from '@/components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'

import { ChangeTeamMemberRoleSection } from './components/changeTeamMemberRoleSection/ChangeTeamMemberRoleSection'
import { RemoveTeamMemberSection } from './components/removeTeamMemberSection/RemoveTeamMemberSection'

export const SettingsTeamMember = () => {
  return (
    <div>
      <SettingsTeamsBreadcrumbs />

      <ChangeTeamMemberRoleSection />

      <RemoveTeamMemberSection />

      <Outlet />
    </div>
  )
}
