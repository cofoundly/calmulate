import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'ul'>

export const List = ({ className = '', children }: Props) => {
  return (
    <ul className={twMerge('divide-theme-border dark:divide-dark-theme-border divide-y', className)}>{children}</ul>
  )
}

export { ListItem } from './ListItem'
