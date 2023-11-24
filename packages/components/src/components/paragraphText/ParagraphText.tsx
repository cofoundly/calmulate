import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'p'>

export const ParagraphText = ({ className = '', children, ...props }: Props) => {
  return (
    <p className={twMerge('text-theme-content dark:text-dark-theme-content text-base', className)} {...props}>
      {children}
    </p>
  )
}
