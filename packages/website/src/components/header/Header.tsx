'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button, Headerbar, Logo, Popover, Sidebar } from 'components'
import { Logomark } from 'components/src/components/logomark/Logomark'
import { useRouter } from 'next/navigation'
import React, { ComponentProps, ComponentPropsWithoutRef, useState } from 'react'

import { AnalyticsPrimaryButtonName } from '@/analytics/models'
import constants from '@/constants.json'
import { routes } from '@/routes'

import { PrimaryActionButton } from '../primaryActionButton/PrimaryActionButton'

type NavigationItem = ComponentProps<typeof Sidebar>['items'][0]

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: 'Features',
    href: routes.features,
  },
  {
    name: 'Testimonials',
    href: routes.testimonials,
  },
  {
    name: 'Pricing',
    href: routes.pricing,
  },
  {
    name: 'Blog',
    href: routes.blog,
  },
]

type Props = ComponentPropsWithoutRef<'header'>

export const Header = ({ ...props }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()

  return (
    <>
      <Headerbar {...props}>
        {NAVIGATION_ITEMS.length ? (
          <Button
            className="-ml-3 lg:hidden"
            aria-label="Open sidebar"
            variant="lightNeutral"
            onClick={() => {
              setSidebarOpen(true)
            }}
          >
            <Bars3Icon className="h-6 w-6" />
          </Button>
        ) : null}

        <Button
          name="Logo"
          className="-ml-3"
          variant="lightNeutral"
          onClick={() => {
            router.push(routes.home)
          }}
        >
          <span className="hidden sm:block">
            <Logo />
          </span>

          <span className="sm:hidden">
            <Logomark />
          </span>
        </Button>

        <div className="hidden items-center gap-x-2 lg:flex">
          {NAVIGATION_ITEMS.map(link => (
            <Button
              key={link.href}
              variant="lightNeutral"
              onClick={() => {
                router.push(link.href)
              }}
            >
              {link.name}
            </Button>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-2 pr-4 lg:pr-0">
          <PrimaryActionButton name={AnalyticsPrimaryButtonName.Header}>
            {constants.header.buttonText}
          </PrimaryActionButton>
        </div>
      </Headerbar>

      {NAVIGATION_ITEMS.length ? (
        <div className="lg:hidden">
          <Popover
            open={sidebarOpen}
            onClose={() => {
              setSidebarOpen(false)
            }}
          >
            <Sidebar
              items={NAVIGATION_ITEMS}
              onItemClick={href => {
                router.push(href)

                setSidebarOpen(false)
              }}
            />
          </Popover>
        </div>
      ) : null}
    </>
  )
}
