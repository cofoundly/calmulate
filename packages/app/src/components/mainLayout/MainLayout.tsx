import { Cog6ToothIcon, EnvelopeOpenIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import { Popover, Sidebar } from 'components'
import React, { ComponentProps } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { isExternalLink, useLink } from 'utils'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { routes } from '@/router/routes'
import { useSidebarOpen } from '@/sidebar/hooks/useSidebarOpen'

import { app } from '../../../../config'

type NavigationItem = ComponentProps<typeof Sidebar>['items'][0]

export const MainLayout = () => {
  const location = useLocation()
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen()

  const navigate = useNavigate()
  const link = useLink()

  const navigationItems: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: routes.dashboard,
      icon: <HomeModernIcon />,
      active: location.pathname === routes.dashboard,
      disabled: hasActiveSubscriptionLoading || !hasActiveSubscription,
    },
    {
      name: 'Settings',
      href: routes.settings,
      icon: <Cog6ToothIcon />,
      active: location.pathname.startsWith(routes.settings),
    },
    {
      name: 'Support',
      href: `mailto:${app.emails.support}`,
      icon: <EnvelopeOpenIcon />,
      active: false,
    },
  ]

  const sidebar = (
    <Sidebar
      items={navigationItems}
      onItemClick={href => {
        if (isExternalLink(href)) {
          link(href, '_blank')

          return
        }

        navigate(href)

        if (sidebarOpen) {
          setSidebarOpen(false)
        }
      }}
    />
  )

  return (
    <div className="flex h-full">
      <div className="lg:hidden">
        <Popover
          open={sidebarOpen}
          onClose={() => {
            setSidebarOpen(false)
          }}
        >
          {sidebar}
        </Popover>
      </div>

      <div className="hidden shrink-0 lg:flex lg:flex-col">{sidebar}</div>

      <div className="bg-theme-background dark:bg-dark-theme-background flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
