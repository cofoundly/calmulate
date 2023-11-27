import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCalendarDateRange } from '@/calendar/hooks/useCalendarDateRange'
import { useCalendarEventCategories } from '@/calendar/hooks/useCalendarEventCategories'
import { useCalendarEvents } from '@/calendar/hooks/useCalendarEvents'
import { date } from '@/date'
import { useMetricSidebar } from '@/metrics/hooks/useMetricSiderbar'

import { CalendarEvent } from './components/CalendarEvent'
import { CalendarHeader } from './components/CalendarHeader'
import { CalendarHorizontalLines } from './components/CalendarHorizontalLines'
import { CalendarNav } from './components/CalendarNav'
import { CalendarVerticalLines } from './components/CalendarVerticalLines'
import { useCalendarAutoScroll } from './hooks/useCalendarAutoScroll'
import { useCalendarResponsiveDateRange } from './hooks/useCalendarResponsiveDateRange'

const GRID_SNAP_INTERVAL_MINUTES = 5
const EVENT_ROWS = 24 * (60 / GRID_SNAP_INTERVAL_MINUTES)

const getEventColStart = (startDate: string) => {
  const day = date(startDate).isoWeekday()

  return day
}

const getEventGridRow = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
  const start = date(startDate)
  const totalMinutes = start.hour() * 60 + start.minute()
  const gridPosition = Math.floor(totalMinutes / GRID_SNAP_INTERVAL_MINUTES) + 1 + 1 // the extra 1 is to account for our initial row start styles

  const duration = date(endDate).diff(start, 'minutes')
  const gridSpan = Math.floor(duration / GRID_SNAP_INTERVAL_MINUTES)

  return `${gridPosition} / span ${gridSpan}`
}

type Props = ComponentPropsWithoutRef<'div'>

// TODO: SS are we able to render overlapping events?
export const WeeklyCalendar = ({ className = '', ...props }: Props) => {
  const [dateRange] = useCalendarDateRange()
  const { data: events } = useCalendarEvents(dateRange)
  const [categories] = useCalendarEventCategories()
  const [metricSidebar] = useMetricSidebar()

  useCalendarResponsiveDateRange()

  const { container, containerNav, containerOffset } = useCalendarAutoScroll()

  return (
    <div className={twMerge('relative flex h-full flex-col', className)} {...props}>
      <CalendarHeader />

      <div
        ref={container}
        className="bg-theme-background dark:bg-dark-theme-background isolate flex flex-auto flex-col overflow-auto"
      >
        <div className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <CalendarNav ref={containerNav} className="sticky top-0 z-30" />

          <div className="relative flex flex-auto">
            <div className="bg-theme-background dark:bg-dark-theme-background ring-theme-border dark:ring-dark-theme-border sticky left-0 z-10 w-14 flex-none ring-1" />

            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              <CalendarHorizontalLines ref={containerOffset} />

              <CalendarVerticalLines />

              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{ gridTemplateRows: `1.75rem repeat(${EVENT_ROWS}, minmax(0, 1fr)) auto` }}
              >
                {events.map(event => {
                  const isMetricSidebarOpenForDay = metricSidebar.date?.isSame(event.startDate, 'day')

                  return (
                    <li
                      key={event.id}
                      className={twMerge(
                        `relative mt-px flex sm:col-start-${getEventColStart(event.startDate)}`,
                        metricSidebar.open && !isMetricSidebarOpenForDay ? 'opacity-50' : '',
                      )}
                      style={{
                        gridRow: getEventGridRow({ startDate: event.startDate, endDate: event.endDate }),
                      }}
                    >
                      <CalendarEvent className="absolute inset-1" event={event} category={categories[event.category]} />
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
