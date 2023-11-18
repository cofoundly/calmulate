import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button, HeadingText } from 'components'
import React, { ComponentPropsWithoutRef, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCalendarDateRange } from '@/calendar/hooks/useCalendarDateRange'
import { date } from '@/date'

type Props = ComponentPropsWithoutRef<'header'>

export const CalendarHeader = ({ className = '', ...props }: Props) => {
  const [{ start: startDate, end: endDate }, setDateRange] = useCalendarDateRange()

  // the calendar is in day mode if the start and end dates are the same day
  const isDayMode = date(startDate).isSame(date(endDate), 'day')

  // display if November 2023 if the start and end dates in November 2023
  // display Oct to Nov 2023 if the start date is in October 2023 and the end date is in November 2023
  const heading =
    date(startDate).format('MMMM YYYY') === date(endDate).format('MMMM YYYY') ? (
      <time dateTime={date(startDate).format('YYYY-MM')}>{date(startDate).format('MMMM YYYY')}</time>
    ) : (
      <>
        <time dateTime={date(startDate).format('YYYY-MM')}>{date(startDate).format('MMM')}</time> to{' '}
        <time dateTime={date(endDate).format('YYYY-MM')}>{date(endDate).format('MMM YYYY')}</time>
      </>
    )

  const onPreviousWeekClick = useCallback(() => {
    setDateRange({
      start: date(startDate)
        .subtract(1, isDayMode ? 'day' : 'week')
        .toISOString(),
      end: date(endDate)
        .subtract(1, isDayMode ? 'day' : 'week')
        .toISOString(),
    })
  }, [setDateRange, startDate, isDayMode, endDate])

  const onThisWeekClick = useCallback(() => {
    setDateRange({
      start: date()
        .startOf(isDayMode ? 'day' : 'week')
        .toISOString(),
      end: date()
        .endOf(isDayMode ? 'day' : 'week')
        .toISOString(),
    })
  }, [isDayMode, setDateRange])

  const onNextWeekClick = useCallback(() => {
    setDateRange({
      start: date(startDate)
        .add(1, isDayMode ? 'day' : 'week')
        .toISOString(),
      end: date(endDate)
        .add(1, isDayMode ? 'day' : 'week')
        .toISOString(),
    })
  }, [setDateRange, startDate, isDayMode, endDate])

  return (
    <header
      className={twMerge(
        'border-theme-border dark:border-dark-theme-border flex flex-none flex-wrap items-center justify-between gap-4 border-b px-6 py-4 lg:px-8',
        className,
      )}
      {...props}
    >
      <HeadingText>{heading}</HeadingText>

      <div className="flex items-center">
        <div className="border-theme-border dark:border-dark-theme-border relative flex items-center rounded-xl border shadow-md">
          <Button variant="secondaryNeutral" className="border-0 shadow-none" onClick={onPreviousWeekClick}>
            <span className="sr-only">{isDayMode ? 'Yesterday' : 'Previous week'}</span>

            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Button variant="secondaryNeutral" className="border-0 shadow-none" onClick={onThisWeekClick}>
            {isDayMode ? 'Today' : 'This Week'}
          </Button>

          <Button variant="secondaryNeutral" className="border-0 shadow-none" onClick={onNextWeekClick}>
            <span className="sr-only">{isDayMode ? 'Tomorrow' : 'Next week'}</span>

            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  )
}
