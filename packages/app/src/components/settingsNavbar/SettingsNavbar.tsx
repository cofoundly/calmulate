import { Button, Navbar } from 'components'
import React, { ComponentProps } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSignOut } from '@/auth/hooks/useSignOut'
import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { useHasTeamPlan } from '@/billing/hooks/useHasTeamPlan'
import { routes, TEAM_ID_PARAM } from '@/router/routes'
import { useTeams } from '@/teams/hooks/useTeams'

import { Header } from '../header/Header'

type NavigationItem = ComponentProps<typeof Navbar>['items'][0]

export const SettingsNavbar = () => {
  const location = useLocation()
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const { data: hasTeamPlan, isLoading: hasTeamPlanLoading } = useHasTeamPlan()
  const { data: teams, isLoading: teamsLoading } = useTeams() // multiple teams are unsupported on the FE and we don't know the default team id so we need to load all teams and choose a default

  const { mutate: signOut, isLoading: signOutLoading } = useSignOut()
  const navigate = useNavigate()

  const defaultTeamId = (teams?.length && teams[0].id) || ''
  const teamsPageDisabled =
    hasActiveSubscriptionLoading || !hasActiveSubscription || hasTeamPlanLoading || !hasTeamPlan || teamsLoading

  const items: NavigationItem[] = [
    {
      name: 'Account',
      href: routes.settingsAccount,
      active: location.pathname.includes(routes.settingsAccount),
    },
    {
      name: 'Subscription',
      href: routes.settingsSubscription,
      active: location.pathname.includes(routes.settingsSubscription),
    },
    {
      name: 'Team',
      href: routes.settingsTeam.replace(TEAM_ID_PARAM, defaultTeamId),
      active: location.pathname.includes(routes.settingsTeam.replace(TEAM_ID_PARAM, defaultTeamId)),
      disabled: teamsPageDisabled,
    },
  ]

  return (
    <Header>
      <Navbar
        items={items}
        onClick={href => {
          navigate(href)
        }}
      >
        <Button
          className="rounded-none"
          variant="light"
          loading={signOutLoading}
          onClick={() => {
            signOut()
          }}
        >
          Sign out
        </Button>
      </Navbar>
    </Header>
  )
}
