import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { List, ListItem, TinyText } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useDailyMetrics } from '@/metrics/hooks/useDailyMetrics'
import { useMetricSettings } from '@/metrics/hooks/useMetricSettings'
import { useMetricSidebar } from '@/metrics/hooks/useMetricSiderbar'
import { Metric, MetricCriteria as MetricCriteriaType } from '@/metrics/models'
import { getMetricCriteriaInfo } from '@/metrics/utils/getMetricCriteriaInfo'

const passIcon = <CheckCircleIcon className="dark:text:green-400 h-5 w-5 text-green-500" />
const failIcon = <XCircleIcon className="dark:text:red-400 h-5 w-5 text-red-500" />

const isCriteriaPassed = (metric: Metric, test: boolean) => {
  if (metric === 'stress') {
    return !test
  }

  return test
}

const getIcon = (metric: Metric, test: boolean) => {
  return isCriteriaPassed(metric, test) ? passIcon : failIcon
}

type Props = ComponentPropsWithoutRef<'ul'>

export const MetricCriteria = ({ className = '', ...props }: Props) => {
  const [metricSidebar] = useMetricSidebar()
  const { data: dailyMetrics } = useDailyMetrics(metricSidebar.date)
  const [metricSettings] = useMetricSettings()

  const metric = metricSidebar.metric
  const criteria = metric && dailyMetrics[metric].criteria

  if (!criteria) {
    return null
  }

  return (
    <List className={twMerge('overflow-y-auto', className)} {...props}>
      {Object.entries(criteria)
        // sort so that failed tests are on top
        // noting that the stress metric is inverted
        .sort(([_A, testA], [_B, testB]) => {
          return testA === testB ? 0 : isCriteriaPassed(metric, testA) ? 1 : -1
        })
        .map(([metricCriteria, test]) => {
          const { label, failReason } = getMetricCriteriaInfo(metricCriteria as MetricCriteriaType, metricSettings)

          return (
            <ListItem key={metricCriteria}>
              <span>{getIcon(metric, test)}</span>

              <div className="flex flex-col gap-y-1">
                {label}

                {!isCriteriaPassed(metric, test) && <TinyText>{failReason}</TinyText>}
              </div>
            </ListItem>
          )
        })}
    </List>
  )
}
