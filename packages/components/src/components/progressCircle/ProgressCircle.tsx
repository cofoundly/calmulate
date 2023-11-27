import { ProgressCircle as ProgressCirclePrimitive, ProgressCircleProps } from '@tremor/react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ProgressCircleProps

export const ProgressCircle = ({ className = '', ...props }: Props) => {
  return <ProgressCirclePrimitive className={twMerge('', className)} {...props} />
}
