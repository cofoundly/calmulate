import React from 'react'
import { Outlet } from 'react-router-dom'

import { PageLayout } from '../pageLayout/PageLayout'
import { SettingsNavbar } from '../settingsNavbar/SettingsNavbar'

export const SettingsLayout = () => {
  return (
    <>
      <SettingsNavbar />

      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  )
}
