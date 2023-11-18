import { useWindowSize } from '@uidotdev/usehooks'
import { Button, TinyText } from 'components'
import React, { ComponentPropsWithoutRef, Fragment, useCallback, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCalendarDateRange } from '@/calendar/hooks/useCalendarDateRange'
import { useCalendarEvents } from '@/calendar/hooks/useCalendarEvents'
import { date } from '@/date'

import { CalendarEvent } from './components/CalendarEvent'
import { CalendarHeader } from './components/CalendarHeader'

// only config to really care about (the rest is just documentation)
const GRID_ROWS_PER_HOUR = 2 // TODO: SS later on we can introduce a zoom level which would modify this value
const GRID_SNAP_INTERVAL_MINUTES = 5

const WEEKDAYS = Array.from({ length: 7 }, (_, i) => date().startOf('isoWeek').add(i, 'day'))

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12
  const ampm = i < 12 ? 'AM' : 'PM'

  return `${hour}${ampm}`
})

const GRID_ROWS = HOURS.length * GRID_ROWS_PER_HOUR
const EVENT_ROWS = HOURS.length * (60 / GRID_SNAP_INTERVAL_MINUTES)

const MD_BREAKPOINT = 640

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
  const [{ start: startDate, end: endDate }, setDateRange] = useCalendarDateRange()
  const { data: events } = useCalendarEvents()

  const container = useRef<HTMLDivElement>(null)
  const containerNav = useRef<HTMLDivElement>(null)
  const containerOffset = useRef<HTMLDivElement>(null)

  const { width: windowWidth } = useWindowSize()

  // the calendar is in day mode if the start and end dates are the same day
  const isDayMode = date(startDate).isSame(date(endDate), 'day')

  useEffect(() => {
    // if the window width is less than the breakpoint, we want to show the day mode
    if (windowWidth && !isDayMode && windowWidth < MD_BREAKPOINT) {
      setDateRange({
        start: date().startOf('day').toISOString(),
        end: date().endOf('day').toISOString(),
      })
    }

    // if the window width is greater than the breakpoint, we want to show the week mode
    if (windowWidth && isDayMode && windowWidth >= MD_BREAKPOINT) {
      setDateRange({
        start: date().startOf('isoWeek').toISOString(),
        end: date().endOf('isoWeek').toISOString(),
      })
    }
  }, [isDayMode, setDateRange, windowWidth])

  useEffect(() => {
    if (!container.current || !containerNav.current || !containerOffset.current) return

    // Set the container scroll position based on the current time.
    const currentMinute = date().hour() * 60

    container.current.scrollTop =
      ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
        currentMinute) /
      (24 * 60)
  }, [])

  const onNavWeekdayClick = useCallback(
    (weekday: typeof WEEKDAYS[0]) => {
      // set the date range to that day
      setDateRange({
        start: weekday.startOf('day').toISOString(),
        end: weekday.endOf('day').toISOString(),
      })
    },
    [setDateRange],
  )

  return (
    <div className={twMerge('relative flex h-full flex-col', className)} {...props}>
      <CalendarHeader />

      <div
        ref={container}
        className="bg-theme-background dark:bg-dark-theme-background isolate flex flex-auto flex-col overflow-auto"
      >
        <div className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div
            ref={containerNav}
            className="bg-theme-background dark:bg-dark-theme-background ring-theme-border dark:ring-dark-theme-border sticky top-0 z-30 flex-none shadow ring-1 sm:pr-8"
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

                const isDayModeDay = isDayMode && day.isSame(date(startDate), 'day')

                return (
                  <Button
                    key={weekday.toISOString()}
                    variant="lightNeutral"
                    className="text-theme-content-subtle dark:text-dark-theme-content-subtle flex flex-col rounded-none border-0 sm:pointer-events-none md:flex-row md:items-baseline"
                    onClick={() => onNavWeekdayClick(day)}
                  >
                    <span>{day.format('ddd')}</span>

                    <b
                      className={twMerge(
                        'text-theme-content dark:text-dark-theme-content mt-1 flex h-8 w-8 items-center justify-center rounded-full sm:mt-0',
                        isToday
                          ? 'bg-theme-brand text-theme-content-inverted dark:bg-dark-theme-brand dark:text-dark-theme-content-inverted'
                          : isDayModeDay
                          ? 'border-theme-brand dark:border-dark-theme-brand border-2'
                          : '',
                      )}
                    >
                      {day.format('D')}
                    </b>
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="relative flex flex-auto">
            <div className="bg-theme-background dark:bg-dark-theme-background ring-theme-border dark:ring-dark-theme-border sticky left-0 z-10 w-14 flex-none ring-1" />

            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="divide-theme-border dark:divide-dark-theme-border col-start-1 col-end-2 row-start-1 grid divide-y"
                style={{ gridTemplateRows: `repeat(${GRID_ROWS}, minmax(3.5rem, 1fr))` }}
              >
                <div ref={containerOffset} className="row-end-1 h-7" />

                {HOURS.map(hour => (
                  <Fragment key={hour}>
                    <div>
                      <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right">
                        <TinyText className="text-theme-content-subtle dark:text-dark-theme-content-subtle">
                          {hour}
                        </TinyText>
                      </div>
                    </div>

                    {Array.from({ length: GRID_ROWS_PER_HOUR - 1 }).map((_, index) => (
                      <div key={index} />
                    ))}
                  </Fragment>
                ))}
              </div>

              {/* Vertical lines */}
              <div className="divide-theme-border dark:divide-dark-theme-border col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x sm:grid sm:grid-cols-7">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className={`row-span-full grid-col-start-${index + 1}`} />
                ))}

                <div
                  className={`row-span-full w-8 grid-col-start-${7 + 1}`} // w-8 corresponds to the right padding of the sticky header, ie. pr-8
                />
              </div>

              {/* Events */}
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
                    <CalendarEvent className="absolute inset-1" event={event} />
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
