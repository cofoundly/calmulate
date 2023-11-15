import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'a'>

export const AnchorText = ({ className = '', children, ...props }: Props) => {
  return (
    <a
      className={twMerge(
        'text-theme-brand dark:text-dark-theme-brand hover:text-theme-brand-emphasis dark:hover:text-dark-theme-brand-emphasis focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle inline-block cursor-pointer whitespace-nowrap rounded-xl font-medium outline-2 outline-offset-4 transition-all focus-visible:outline',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
