import { useMemo } from 'react'

import { useCalendarEvents } from '@/calendar/hooks/useCalendarEvents'
import { date } from '@/date'

import { calculateDailyMetrics } from '../utils/calculateDailyMetrics'
import { useMetricSettings } from './useMetricSettings'

export const useDailyMetrics = (day: date.Dayjs | null) => {
  const dateRange = day
    ? {
        startDate: day.startOf('day'),
        endDate: day.endOf('day'),
      }
    : undefined
  const { data: events, ...eventsQuery } = useCalendarEvents(dateRange)
  const [metricsSettings] = useMetricSettings()

  const dailyMetrics = useMemo(() => calculateDailyMetrics(events, metricsSettings), [events, metricsSettings])

  return { data: dailyMetrics, ...eventsQuery }
}
