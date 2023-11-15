import { Text } from '@react-email/components'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TitleProps = {
  className?: string
  children?: ReactNode
}

export const TitleText = ({ className = '', children }: TitleProps) => {
  return (
    <Text className={twMerge(`text-theme-content-emphasis m-0 mb-2 text-lg font-medium ${className}`)}>{children}</Text>
  )
}
