import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCalendarEventCategories } from '@/calendar/hooks/useCalendarEventCategories'
import { useCalendarEvents } from '@/calendar/hooks/useCalendarEvents'
import { date } from '@/date'

import { CalendarEvent } from './components/CalendarEvent'
import { CalendarHeader } from './components/CalendarHeader'
import { CalendarHorizontalLines } from './components/CalendarHorizontalLines'
import { CalendarNav } from './components/CalendarNav'
import { CalendarVerticalLines } from './components/CalendarVerticalLines'
import { useCalendarAutoScroll } from './hooks/useCalendarAutoScroll'
import { useCalendarResponsiveDateRange } from './hooks/useCalendarResponsiveDateRange'

const GRID_SNAP_INTERVAL_MINUTES = 5
const EVENT_ROWS = 24 * (60 / GRID_SNAP_INTERVAL_MINUTES)

const getEventColStart = (start: string) => {
  const day = date(start).isoWeekday()

  return day
}

const getEventGridRow = ({ start, end }: { start: string; end: string }) => {
  const startDate = date(start)
  const totalMinutes = startDate.hour() * 60 + startDate.minute()
  const gridPosition = Math.floor(totalMinutes / GRID_SNAP_INTERVAL_MINUTES) + 1 + 1 // the extra 1 is to account for our initial row start styles

  const duration = date(end).diff(startDate, 'minutes')
  const gridSpan = Math.floor(duration / GRID_SNAP_INTERVAL_MINUTES)

  return `${gridPosition} / span ${gridSpan}`
}

type Props = ComponentPropsWithoutRef<'div'>

export const WeeklyCalendar = ({ className = '', ...props }: Props) => {
  const { data: events } = useCalendarEvents()
  const [categories] = useCalendarEventCategories()

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
                {events.map(event => (
                  <li
                    key={event.id}
                    className={`relative mt-px flex sm:col-start-${getEventColStart(event.start)}`}
                    style={{
                      gridRow: getEventGridRow({ start: event.start, end: event.end }),
                    }}
                  >
                    <CalendarEvent className="absolute inset-1" event={event} category={categories[event.category]} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
