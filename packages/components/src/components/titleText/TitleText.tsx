import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'h1'>

export const TitleText = ({ className = '', children, ...props }: Props) => {
  return (
    <h2
      className={twMerge(
        'text-theme-content dark:text-dark-theme-content font-display text-3xl leading-[1.25] tracking-tight lg:text-4xl lg:leading-[1.25]',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
