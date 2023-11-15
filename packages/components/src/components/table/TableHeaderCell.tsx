import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'th'>

export const TableHeaderCell = ({ className = '', ...props }: Props) => {
  return (
    <th
      className={twMerge(
        'text-theme-content dark:text-dark-theme-content bg-theme-background dark:bg-dark-theme-background sticky top-0 whitespace-nowrap px-4 py-3.5 text-left text-sm font-semibold',
        className,
      )}
      {...props}
    />
  )
}
