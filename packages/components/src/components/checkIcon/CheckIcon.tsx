import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'svg'>

export const CheckIcon = ({ className = '', ...props }: Props) => {
  return <CheckBadgeIcon className={twMerge('text-theme-brand dark:text-dark-theme-brand h-5', className)} {...props} />
}
