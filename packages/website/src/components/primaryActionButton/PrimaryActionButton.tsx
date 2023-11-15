'use client'

import { Button, ButtonProps } from 'components/src/components/button/Button'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { usePrimaryActionClick } from '@/actions/hooks/usePrimaryActionClick'
import { AnalyticsPrimaryButtonName } from '@/analytics/models'

type Props = Omit<ButtonProps, 'name'> & {
  name: AnalyticsPrimaryButtonName
}

export const PrimaryActionButton = ({ className = '', name, children, ...props }: Props) => {
  const onPrimaryActionClick = usePrimaryActionClick()

  return (
    <Button
      className={twMerge('', className)}
      onClick={() => {
        onPrimaryActionClick({ buttonName: name })
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
