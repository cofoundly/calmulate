import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { SmallText } from '../smallText/SmallText'

type Props = ComponentPropsWithoutRef<'div'>

export const Badge = ({ className = '', children, ...props }: Props) => {
  return (
    <div
      {...props}
      className={twMerge(
        'bg-theme-brand-muted dark:bg-dark-theme-brand-muted flex items-center whitespace-nowrap rounded-full px-2 py-0.5',
        className,
      )}
    >
      <SmallText className="text-theme-brand-emphasis dark:text-dark-theme-brand-emphasis text-xs">
        {children}
      </SmallText>
    </div>
  )
}
