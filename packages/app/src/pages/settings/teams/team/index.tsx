import React from 'react'
import { Outlet } from 'react-router-dom'

import { SettingsTeamsBreadcrumbs } from '@/components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'

import { ChangeTeamNameSection } from './components/changeTeamNameSection/ChangeTeamNameSection'
import { ManageTeamMembersSection } from './components/manageTeamMembersSection/ManageTeamMembersSection'

export const SettingsTeam = () => {
  return (
    <div>
      <SettingsTeamsBreadcrumbs />

      <ManageTeamMembersSection />

      <ChangeTeamNameSection />

      <Outlet />
    </div>
  )
}
