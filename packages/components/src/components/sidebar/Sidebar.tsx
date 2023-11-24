import { ReactNode } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button/Button'
import { Logo } from '../logo/Logo'

type Props = {
  items: {
    name: string
    href: string
    icon?: ReactNode
    active?: boolean
    disabled?: boolean
  }[]
  onItemClick: (href: string) => void
}

export const Sidebar = ({ items, onItemClick }: Props) => {
  return (
    <div className="bg-theme-brand dark:bg-dark-theme-brand flex grow flex-col gap-y-6 overflow-y-auto p-6 shadow-xl">
      <div className="flex items-center">
        <Logo className="fill-theme-brand-inverted text-theme-brand-inverted dark:text-dark-theme-brand-inverted dark:fill-dark-theme-brand-inverted" />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul className="-mx-2 flex flex-col space-y-1 pb-4">
          {items.map(item => {
            return (
              <li key={item.name}>
                <Button
                  icon={item.icon}
                  className={twMerge(
                    'w-full justify-start border-none font-semibold shadow-none outline-offset-0',
                    item.active
                      ? 'bg-theme-brand-emphasis text-theme-brand-inverted dark:bg-dark-theme-brand-emphasis dark:text-dark-theme-brand-inverted'
                      : 'text-theme-brand-inverted hover:bg-theme-brand-emphasis dark:text-dark-theme-brand-inverted dark:hover:bg-dark-theme-brand-emphasis',
                  )}
                  disabled={item.disabled}
                  onClick={() => {
                    // navigate to the route if we're not already on that route
                    if (!item.active) {
                      onItemClick(item.href)
                    }
                  }}
                >
                  {item.name}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
