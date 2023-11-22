import { BriefcaseIcon, HeartIcon, ScaleIcon } from '@heroicons/react/24/solid'
import { ProgressCircle } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { CalendarEvent } from '@/calendar/models'
import { MetricSettings } from '@/metrics/hooks/useMetricSettings'
import { calculateDailyMetrics } from '@/metrics/utils/calculateDailyMetrics'

const getScoreColor = ({
  score,
  settingHigh,
  settingAverage,
  inverted = false,
}: {
  score: number
  settingHigh: number
  settingAverage: number
  inverted?: boolean
}) => {
  if (score >= settingHigh) {
    return inverted ? 'red' : 'green'
  }

  if (score >= settingAverage) {
    return 'orange'
  }

  return inverted ? 'green' : 'red'
}

type Props = ComponentPropsWithoutRef<'div'> & {
  events: CalendarEvent[]
  metricsSettings: MetricSettings
  loading?: boolean
}

// TODO: SS it would be so cool if we could animate a 10/10 state, like the user achieved something great, because they did!
export const CalendarDayStatus = ({ className = '', events, metricsSettings, loading, ...props }: Props) => {
  const dailyMetrics = calculateDailyMetrics(events, metricsSettings)
  const stressColor = getScoreColor({
    score: dailyMetrics.stress,
    settingHigh: metricsSettings.stressHigh,
    settingAverage: metricsSettings.stressAverage,
    inverted: true,
  })
  const productivityColor = getScoreColor({
    score: dailyMetrics.productivity,
    settingHigh: metricsSettings.productivityHigh,
    settingAverage: metricsSettings.productivityAverage,
  })
  const balanceColor = getScoreColor({
    score: dailyMetrics.balance,
    settingHigh: metricsSettings.balanceHigh,
    settingAverage: metricsSettings.balanceAverage,
  })

  return (
    <div className={twMerge('flex flex-wrap items-center justify-center gap-2', className)} {...props}>
      <ProgressCircle size="xs" color={loading ? 'gray' : stressColor} value={loading ? 0 : dailyMetrics.stress}>
        <HeartIcon
          className={twMerge(
            'h-4 w-4',
            loading
              ? 'text-theme-content-subtle dark:text-dark-theme-content-subtle'
              : `text-${stressColor}-500 dark:text-${stressColor}-400`,
          )}
        />
      </ProgressCircle>

      <ProgressCircle
        size="xs"
        color={loading ? 'gray' : productivityColor}
        value={loading ? 0 : dailyMetrics.productivity}
      >
        <BriefcaseIcon
          className={twMerge(
            'h-4 w-4',
            loading
              ? 'text-theme-content-subtle dark:text-dark-theme-content-subtle'
              : `text-${productivityColor}-500 dark:text-${productivityColor}-400`,
          )}
        />
      </ProgressCircle>

      <ProgressCircle size="xs" color={loading ? 'gray' : balanceColor} value={loading ? 0 : dailyMetrics.balance}>
        <ScaleIcon
          className={twMerge(
            'h-4 w-4',
            loading
              ? 'text-theme-content-subtle dark:text-dark-theme-content-subtle'
              : `text-${balanceColor}-500 dark:text-${balanceColor}-400`,
          )}
        />
      </ProgressCircle>
    </div>
  )
}
