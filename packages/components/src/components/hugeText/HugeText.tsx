import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h1'>

export const HugeText = ({ className = '', children, ...props }: Props) => {
  return (
    <h1
      className={twMerge(
        'text-theme-content dark:text-dark-theme-content font-display text-4xl font-semibold tracking-tight lg:text-6xl lg:leading-[1.25]',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
