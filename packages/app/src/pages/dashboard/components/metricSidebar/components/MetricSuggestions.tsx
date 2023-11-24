import { List, ListItem } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useDailyMetrics } from '@/metrics/hooks/useDailyMetrics'
import { useMetricSettings } from '@/metrics/hooks/useMetricSettings'
import { useMetricSidebar } from '@/metrics/hooks/useMetricSiderbar'
import { MetricCriteria as MetricCriteriaType } from '@/metrics/models'
import { getFailedMetricCriteriaSuggestions } from '@/metrics/utils/getFailedMetricCriteriaSuggestions'

type Props = ComponentPropsWithoutRef<'ul'>

export const MetricSuggestions = ({ className = '', ...props }: Props) => {
  const [metricSidebar] = useMetricSidebar()
  const { data: dailyMetrics } = useDailyMetrics(metricSidebar.date)
  const [metricSettings] = useMetricSettings()

  const criteria = metricSidebar.metric && dailyMetrics[metricSidebar.metric].criteria

  if (!criteria) {
    return null
  }

  return (
    <List className={twMerge('overflow-y-auto', className)} {...props}>
      {Object.entries(criteria)
        .filter(([_, test]) =>
          // the stress metric is inverted
          metricSidebar.metric === 'stress' ? test : !test,
        )
        .map(([metricCriteria]) => (
          <ListItem key={metricCriteria}>
            <div
              className="dark:border:dark-theme-brand border-theme-brand mt-0.5 h-4 rounded border-2"
              style={{ minWidth: '1rem' }}
            />

            {getFailedMetricCriteriaSuggestions(metricCriteria as MetricCriteriaType, metricSettings)}
          </ListItem>
        ))}
    </List>
  )
}
