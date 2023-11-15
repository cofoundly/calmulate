import { ChevronRightIcon } from '@heroicons/react/24/outline'
import React, { ReactNode } from 'react'

import { Button } from '../button/Button'
import { SmallText } from '../smallText/SmallText'

type Props = {
  items: {
    name: string
    href: string
    icon?: ReactNode
    active?: boolean
    disabled?: boolean
  }[]
  onClick: (href: string) => void
}

export const Breadcrumbs = ({ items, onClick }: Props) => {
  return (
    <nav className="flex" aria-label="Breadcrumbs">
      <ol className="flex items-center space-x-4">
        {items?.map((item, index) => {
          const active = item.active
          const isLastBreadcrumb = index === items.length - 1

          return (
            <li key={item.name} className="flex items-center space-x-4">
              <Button
                variant="lightNeutral"
                disabled={active || item.disabled}
                onClick={() => {
                  // navigate to the route if we're not already on that route
                  if (!active && onClick) {
                    onClick(item.href)
                  }
                }}
              >
                {item.name}
              </Button>

              {!isLastBreadcrumb && (
                <SmallText>
                  <ChevronRightIcon className="h-4 w-4" />
                </SmallText>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
