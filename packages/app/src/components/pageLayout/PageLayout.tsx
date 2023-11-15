import { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const PageLayout = ({ className = '', ...props }: Props) => {
  return (
    <div
      className={twMerge(
        'bg-theme-background dark:bg-dark-theme-background h-full overflow-y-auto px-6 py-8 lg:px-8 lg:py-12',
        className,
      )}
      {...props}
    />
  )
}
