import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, HeadingText, Navbar, Popover, SmallText } from 'components'
import React, { useCallback, useState } from 'react'

import { MetricProgressIndicator } from '@/components/metricProgressIndicator/MetricProgressIndicator'
import { useDailyMetrics } from '@/metrics/hooks/useDailyMetrics'
import { useMetricSidebar } from '@/metrics/hooks/useMetricSiderbar'
import { getMetricTitle } from '@/metrics/utils/getMetricTitle'

import { MetricCriteria } from './components/MetricCriteria'
import { MetricSuggestions } from './components/MetricSuggestions'

enum Tab {
  Criteria = 'criteria',
  Suggestions = 'suggestions',
}

export const MetricSidebar = () => {
  const [metricSidebar, setMetricSidebar] = useMetricSidebar()
  const { data: dailyMetrics, isLoading } = useDailyMetrics(metricSidebar.date)
  const [tab, setTab] = useState<Tab>(Tab.Criteria)

  const metric = metricSidebar.metric
  const score = metric ? dailyMetrics[metric].score : 0

  const onClose = useCallback(() => {
    setMetricSidebar({
      open: false,
      metric: null,
      date: null,
    })
  }, [setMetricSidebar])

  return (
    <Popover
      className="overflow-hidden"
      open={metricSidebar.open}
      position="right"
      showBackdrop={false}
      showCloseIcon={false}
      onClose={onClose}
    >
      <div className="bg-theme-background dark:bg-dark-theme-background border-theme-border dark:border-dark-theme-border flex w-screen flex-col gap-y-4 border-l p-6">
        <div className="flex items-center justify-between gap-x-8">
          {metric && <MetricProgressIndicator metric={metric} score={score} showDetail size="sm" loading={isLoading} />}

          <Button variant="lightNeutral" className="pr-0" onClick={onClose}>
            <XMarkIcon className="h-6 w-6" />
          </Button>
        </div>

        <div className="bg-theme-background-subtle dark:bg-dark-theme-background-subtle rounded-xl px-4 py-2">
          <HeadingText>{getMetricTitle(metric)} Analysis</HeadingText>

          <SmallText>{metricSidebar.date?.format('MMMM D, YYYY')}</SmallText>
        </div>

        <div>
          <Navbar
            items={[
              {
                id: Tab.Criteria,
                name: 'Criteria',
                active: tab === Tab.Criteria,
              },
              {
                id: Tab.Suggestions,
                name: 'Suggestions',
                active: tab === Tab.Suggestions,
              },
            ]}
            onClick={({ id }) => setTab(id)}
          />
        </div>

        {tab === Tab.Criteria ? <MetricCriteria /> : <MetricSuggestions />}
      </div>
    </Popover>
  )
}
