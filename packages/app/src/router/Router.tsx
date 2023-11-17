import { ErrorBoundary } from '@sentry/react'
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'

import { AuthenticatedLayout } from '@/components/authenticatedLayout/AuthenticatedLayout'
import { MainLayout } from '@/components/mainLayout/MainLayout'
import { SettingsLayout } from '@/components/settingsLayout/SettingsLayout'
import { SubscriptionLayout } from '@/components/subscriptionLayout/SubscriptionLayout'
import { TeamAdminLayout } from '@/components/teamAdminLayout/TeamAdminLayout'
import { TeamPlanLayout } from '@/components/teamPlanLayout/TeamPlanLayout'
import { UnauthenticatedLayout } from '@/components/unauthenticatedLayout/UnauthenticatedLayout'
import { Dashboard } from '@/pages/dashboard'
import { ForgotPassword } from '@/pages/forgotPassword'
import { SettingsAccount } from '@/pages/settings/account'
import { SettingsCalendars } from '@/pages/settings/calendars'
import { SettingsSubscription } from '@/pages/settings/subscription'
import { SettingsInviteTeamMembers } from '@/pages/settings/teams/inviteTeamMembers'
import { SettingsTeam } from '@/pages/settings/teams/team'
import { SettingsTeamMember } from '@/pages/settings/teams/teamMember'
import { SettingsRemoveTeamMember } from '@/pages/settings/teams/teamMember/removeTeamMember'
import { SignIn } from '@/pages/signIn'
import { SignUp } from '@/pages/signUp'
import { UserManagement } from '@/pages/userManagement'

import { routes } from './routes'

const errorElement = <ErrorBoundary />

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<UnauthenticatedLayout />} errorElement={errorElement}>
        <Route path={routes.signUp} element={<SignUp />} errorElement={errorElement} />

        <Route path={routes.signIn} element={<SignIn />} errorElement={errorElement} />

        <Route path={routes.forgotPassword} element={<ForgotPassword />} errorElement={errorElement} />

        <Route path={routes.userManagement} element={<UserManagement />} errorElement={errorElement} />

        <Route path="*" element={<Navigate to={routes.signIn} />} />
      </Route>

      <Route element={<AuthenticatedLayout />} errorElement={errorElement}>
        <Route element={<MainLayout />} errorElement={errorElement}>
          <Route element={<SubscriptionLayout />} errorElement={errorElement}>
            <Route path={routes.dashboard} element={<Dashboard />} errorElement={errorElement} />
          </Route>

          <Route element={<SettingsLayout />} errorElement={errorElement}>
            <Route
              path={routes.settings}
              element={<Navigate to={routes.settingsAccount} />}
              errorElement={errorElement}
            />

            <Route path={routes.settingsAccount} element={<SettingsAccount />} errorElement={errorElement} />

            <Route path={routes.settingsSubscription} element={<SettingsSubscription />} errorElement={errorElement} />

            <Route path={routes.settingsCalendars} element={<SettingsCalendars />} errorElement={errorElement} />

            <Route element={<SubscriptionLayout />} errorElement={errorElement}>
              <Route element={<TeamPlanLayout />} errorElement={errorElement}>
                <Route path={routes.settingsTeam} element={<SettingsTeam />} errorElement={errorElement} />

                <Route element={<TeamAdminLayout />} errorElement={errorElement}>
                  <Route
                    path={routes.settingsInviteTeamMembers}
                    element={<SettingsInviteTeamMembers />}
                    errorElement={errorElement}
                  />

                  <Route path={routes.settingsTeamMember} element={<SettingsTeamMember />} errorElement={errorElement}>
                    <Route
                      path={routes.settingsRemoveTeamMember}
                      element={<SettingsRemoveTeamMember />}
                      errorElement={errorElement}
                    />
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<Navigate to={routes.settingsAccount} />} />
          </Route>

          <Route path="*" element={<Navigate to={routes.dashboard} />} />
        </Route>
      </Route>
    </>,
  ),
)

export const Router = () => {
  return <RouterProvider router={router} />
}
