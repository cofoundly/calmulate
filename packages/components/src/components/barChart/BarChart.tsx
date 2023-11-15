import { BarChart as BarChartPrimitive, BarChartProps } from '@tremor/react'
import { colors } from 'colors'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { Card } from '../card/Card'
import { HeadingText } from '../headingText/HeadingText'

type Props = BarChartProps & {
  title?: string
}

export const BarChart = ({ className = '', title, ...props }: Props) => {
  return (
    <Card className="cursor-default">
      {title && <HeadingText className="mb-4">{title}</HeadingText>}

      <BarChartPrimitive
        className={twMerge('fill-theme-content dark:fill-dark-theme-content font-sans text-xs', className)}
        colors={colors}
        showAnimation
        showGridLines={false}
        {...props}
      />
    </Card>
  )
}
