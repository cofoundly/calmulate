import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button/Button'

type Props = {
  items: {
    name: string
    href: string
    icon?: ReactNode
    active?: boolean
    disabled?: boolean
  }[]
  onClick?: (href: string) => void
} & Omit<ComponentPropsWithoutRef<'ul'>, 'onClick'>

export const Navbar = ({ className, items, onClick, children, ...props }: Props) => {
  return (
    <ul className={twMerge(`flex flex-1 gap-x-2 overflow-x-auto lg:gap-x-4`, className)} {...props}>
      {items.map(item => (
        <li key={item.name}>
          <Button
            className={twMerge(
              item.active
                ? 'border-theme-brand dark:border-dark-theme-brand'
                : 'hover:border-theme-border dark:hover:border-dark-theme-border',
              'h-full rounded-none border-b-2 border-l-0 border-r-0 border-t-0',
            )}
            variant="lightNeutral"
            disabled={item.disabled}
            onClick={() => {
              // navigate to the route if we're not already on that route
              if (!item.active && onClick) {
                onClick(item.href)
              }
            }}
          >
            {item.name}
          </Button>
        </li>
      ))}

      <li className="flex flex-1 justify-end border-b-2 border-transparent">{children}</li>
    </ul>
  )
}
