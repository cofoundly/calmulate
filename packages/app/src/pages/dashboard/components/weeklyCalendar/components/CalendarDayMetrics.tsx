import { Button } from 'components'
import React, { ComponentPropsWithoutRef, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import { MetricProgressIndicator } from '@/components/metricProgressIndicator/MetricProgressIndicator'
import { date } from '@/date'
import { useDailyMetrics } from '@/metrics/hooks/useDailyMetrics'
import { useMetricSidebar } from '@/metrics/hooks/useMetricSiderbar'
import { Metric } from '@/metrics/models'

const METRICS: Metric[] = ['stress', 'productivity', 'balance']

type Props = ComponentPropsWithoutRef<'div'> & {
  day: date.Dayjs
}

// TODO: SS it would be so cool if we could animate a 10/10 state, like the user achieved something great, because they did!
export const CalendarDayMetrics = ({ className = '', day, ...props }: Props) => {
  const { data: dailyMetrics, isLoading } = useDailyMetrics(day)
  const [metricSidebar, setMetricSidebar] = useMetricSidebar()

  const onMetricClick = useCallback(
    (metric: Metric) => {
      setMetricSidebar({
        open: true,
        metric,
        date: day,
      })
    },
    [day, setMetricSidebar],
  )

  return (
    <div className={twMerge('flex flex-wrap items-center justify-center gap-2', className)} {...props}>
      {METRICS.map(metric => {
        const highlight =
          metricSidebar.open && metricSidebar.metric === metric && metricSidebar.date?.isSame(day, 'day')

        return (
          <Button
            key={metric}
            variant="lightNeutral"
            className={twMerge(
              'rounded-full p-0 hover:scale-110',
              highlight ? 'ring-theme-brand dark:ring-dark-theme-brand ring-2' : '',
            )}
            onClick={() => onMetricClick(metric)}
          >
            <MetricProgressIndicator metric={metric} score={dailyMetrics[metric].score} loading={isLoading} />
          </Button>
        )
      })}
    </div>
  )
}
