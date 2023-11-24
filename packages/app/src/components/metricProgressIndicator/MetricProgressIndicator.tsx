import { ProgressCircle, SmallText } from 'components'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { useMetricSettings } from '@/metrics/hooks/useMetricSettings'
import { Metric } from '@/metrics/models'
import { getMetricIcon } from '@/metrics/utils/getMetricIcon'
import { getMetricScoreColor } from '@/metrics/utils/getMetricScoreColor'
import { getMetricScoreLabel } from '@/metrics/utils/getMetricScoreLabel'

type Props = {
  metric: Metric
  score: number
  showDetail?: boolean
  size?: 'xs' | 'sm'
  loading?: boolean
}

export const MetricProgressIndicator = ({ metric, score, showDetail = false, size = 'xs', loading }: Props) => {
  const [metricSettings] = useMetricSettings()

  const color = getMetricScoreColor({
    score,
    settingHigh: metricSettings[`${metric}High`],
    settingAverage: metricSettings[`${metric}Average`],
    inverted: metric === 'stress',
  })
  const Icon = getMetricIcon(metric)
  const label = getMetricScoreLabel({
    score: score,
    settingHigh: metricSettings[`${metric}High`],
    settingAverage: metricSettings[`${metric}Average`],
  })

  return (
    <div className="flex items-center gap-x-4">
      <ProgressCircle size={size} color={loading ? 'gray' : color} value={loading ? 0 : score * 10}>
        <Icon
          className={twMerge(
            size === 'xs' ? 'h-4 w-4' : 'h-5 w-5',
            loading
              ? 'text-theme-content-subtle dark:text-dark-theme-content-subtle'
              : `text-${color}-500 dark:text-${color}-400`,
          )}
        />
      </ProgressCircle>

      {showDetail && (
        <div className="">
          <SmallText>
            <b>
              <span className={`text-${color}-500 dark:text-${color}-400`}>{score}</span> / 10
            </b>
          </SmallText>

          <SmallText>
            <b className={`text-${color}-500 dark:text-${color}-400`}>{label}</b>
          </SmallText>
        </div>
      )}
    </div>
  )
}
