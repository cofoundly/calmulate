import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button, Headerbar, Logo } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSidebarOpen } from '@/sidebar/hooks/useSidebarOpen'

type Props = ComponentPropsWithoutRef<'header'>

export const Header = ({ className = '', children }: Props) => {
  const [_, setSidebarOpen] = useSidebarOpen()

  return (
    <Headerbar className={twMerge('lg:hidden', className)}>
      <Button
        variant="lightInverted"
        className="lg:hidden"
        onClick={() => {
          setSidebarOpen(true)
        }}
      >
        <span className="sr-only">Open sidebar</span>

        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </Button>

      <Logo className="lg:hidden" variant="inverted" />

      {children}
    </Headerbar>
  )
}
