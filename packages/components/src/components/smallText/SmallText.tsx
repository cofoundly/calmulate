import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'p'>

export const SmallText = ({ className = '', children, ...props }: Props) => {
  return (
    <small
      className={twMerge('text-theme-content dark:text-dark-theme-content block text-sm font-normal', className)}
      {...props}
    >
      {children}
    </small>
  )
}
