import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'tbody'>

export const TableBody = ({ className = '', ...props }: Props) => {
  return (
    <tbody
      className={twMerge('divide-theme-border dark:divide-dark-theme-border divide-y overflow-x-auto', className)}
      {...props}
    />
  )
}
