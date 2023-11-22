import { Button } from 'components'
import React, { ComponentPropsWithoutRef, forwardRef, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCalendarDateRange } from '@/calendar/hooks/useCalendarDateRange'
import { useCalendarEvents } from '@/calendar/hooks/useCalendarEvents'
import { filterEventsByDateRange } from '@/calendar/utils/filterEventsByDateRange'
import { getCurrentWeekdays } from '@/calendar/utils/getCurrentWeekdays'
import { isDayMode } from '@/calendar/utils/isDayMode'
import { date } from '@/date'
import { useMetricsSettings } from '@/metrics/hooks/useMetricsSettings'

import { CalendarDayStatus } from './CalendarDayStatus'

const WEEKDAYS = getCurrentWeekdays()

type Props = ComponentPropsWithoutRef<'div'>

export const CalendarNav = forwardRef(({ className = '', ...props }: Props, ref: any) => {
  const [{ startDate, endDate }, setDateRange] = useCalendarDateRange()

  const dayMode = isDayMode({ startDate, endDate })

  // using these hooks here are purely an optimisation for CalendarDayStatus
  const { data: calendarEvents, isLoading: calendarEventsLoading } = useCalendarEvents({
    // we need the full week's event's in case we are in day mode
    startDate: dayMode ? date(startDate).startOf('isoWeek').toISOString() : startDate,
    endDate: dayMode ? date(startDate).endOf('isoWeek').toISOString() : endDate,
  })
  const [metricsSettings] = useMetricsSettings()

  const onNavWeekdayClick = useCallback(
    (weekday: typeof WEEKDAYS[0]) => {
      // set the date range to that day
      setDateRange({
        startDate: weekday.startOf('day').toISOString(),
        endDate: weekday.endOf('day').toISOString(),
      })
    },
    [setDateRange],
  )

  return (
    <div
      ref={ref}
      className={twMerge(
        'bg-theme-background dark:bg-dark-theme-background ring-theme-border dark:ring-dark-theme-border flex-none shadow ring-1 sm:pr-8',
        className,
      )}
      {...props}
    >
      <div className="sm:divide-theme-border sm:dark:divide-dark-theme-border sm:dark:border-dark-theme-border sm:border-theme-border grid grid-cols-7 sm:-mr-px sm:divide-x sm:border-r">
        <div className="col-end-1 hidden w-14 sm:block" />

        {WEEKDAYS.map(weekday => {
          // the WEEKDAYS represent the latest week, so we need to get the date relative to the start of the week using the dateRange start date
          // NOTE: we need to set the startOf('week') because in day mode we modify the dateRange to be the same day
          const startOfWeek = date(startDate).startOf('week')
          const weekdayIndex = weekday.isoWeekday()
          const day = startOfWeek.add(weekdayIndex - 1, 'day')

          const today = date().startOf('day')
          const isToday = day.isSame(today, 'day')

          const dayModeDay = dayMode && day.isSame(date(startDate), 'day')

          const events = filterEventsByDateRange({
            events: calendarEvents,
            startDate: day.startOf('day').toISOString(),
            endDate: day.endOf('day').toISOString(),
          })
          const hasEvents = events.length

          return (
            <Button
              key={weekday.toISOString()}
              variant="lightNeutral"
              className="text-theme-content-subtle dark:text-dark-theme-content-subtle flex flex-col justify-end gap-y-4 rounded-none border-0 sm:pointer-events-none"
              onClick={() => onNavWeekdayClick(day)}
            >
              {hasEvents ? (
                <CalendarDayStatus events={events} metricsSettings={metricsSettings} loading={calendarEventsLoading} />
              ) : null}

              <div className="flex flex-col gap-2 md:flex-row md:items-baseline">
                <span>{day.format('ddd')}</span>

                <b
                  className={twMerge(
                    'text-theme-content dark:text-dark-theme-content flex h-8 w-8 items-center justify-center rounded-full',
                    isToday
                      ? 'bg-theme-brand text-theme-content-inverted dark:bg-dark-theme-brand dark:text-dark-theme-content-inverted'
                      : dayModeDay
                      ? 'border-theme-brand dark:border-dark-theme-brand border-2'
                      : '',
                  )}
                >
                  {day.format('D')}
                </b>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
})
