import { Text } from '@react-email/components'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  children?: ReactNode
}

export const DescriptionText = ({ className = '', children }: Props) => {
  return <Text className={twMerge(`text-theme-content m-0 text-sm ${className}`)}>{children}</Text>
}
