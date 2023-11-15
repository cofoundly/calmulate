import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'header'>

export const Headerbar = ({ className = '', children, ...props }: Props) => {
  return (
    <header
      className={twMerge(
        'bg-theme-brand lg:bg-theme-background dark:bg-dark-theme-brand lg:dark:bg-dark-theme-background border-theme-border dark:border-dark-theme-border flex h-16 w-full shrink-0 gap-x-1 border-b px-2 shadow-lg lg:gap-x-2 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </header>
  )
}
