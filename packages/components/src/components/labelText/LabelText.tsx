import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'label'>

export const LabelText = ({ className = '', children, ...props }: Props) => {
  return (
    <label
      className={twMerge(
        'text-theme-content dark:text-dark-theme-content whitespace-nowrap text-sm font-normal',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}
