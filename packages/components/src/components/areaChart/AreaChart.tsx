import { AreaChart as AreaChartPrimitive, AreaChartProps } from '@tremor/react'
import { colors } from 'colors'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { Card } from '../card/Card'
import { HeadingText } from '../headingText/HeadingText'

type Props = AreaChartProps & {
  title?: string
}

export const AreaChart = ({ className = '', title, ...props }: Props) => {
  return (
    <Card className="cursor-default">
      {title && <HeadingText className="mb-4">{title}</HeadingText>}

      <AreaChartPrimitive
        className={twMerge('fill-theme-content dark:fill-dark-theme-content font-sans text-xs', className)}
        showAnimation
        showGridLines={false}
        colors={colors}
        {...props}
      />
    </Card>
  )
}
