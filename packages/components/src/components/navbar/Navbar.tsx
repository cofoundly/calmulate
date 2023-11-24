import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button/Button'

type Props<T> = {
  items: T[]
  onClick?: (item: T) => void
} & Omit<ComponentPropsWithoutRef<'ul'>, 'onClick'>

export const Navbar = <T extends { name: string; active?: boolean; disabled?: boolean }>({
  className,
  items,
  onClick,
  children,
  ...props
}: Props<T>) => {
  return (
    <ul className={twMerge(`flex flex-1 overflow-x-auto`, className)} {...props}>
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
              // call onlick only if the item is not active
              if (!item.active && onClick) {
                onClick(item)
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
