import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button, HeadingText } from 'components'
import React, { ComponentPropsWithoutRef, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import { useCalendarDateRange } from '@/calendar/hooks/useCalendarDateRange'
import { isDayMode } from '@/calendar/utils/isDayMode'
import { date } from '@/date'

type Props = ComponentPropsWithoutRef<'header'>

export const CalendarHeader = ({ className = '', ...props }: Props) => {
  const [{ startDate, endDate }, setDateRange] = useCalendarDateRange()

  const dayMode = isDayMode({ startDate, endDate })

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
      startDate: date(startDate).subtract(1, dayMode ? 'day' : 'week'),
      endDate: date(endDate).subtract(1, dayMode ? 'day' : 'week'),
    })
  }, [setDateRange, startDate, dayMode, endDate])

  const onThisWeekClick = useCallback(() => {
    setDateRange({
      startDate: date().startOf(dayMode ? 'day' : 'week'),
      endDate: date().endOf(dayMode ? 'day' : 'week'),
    })
  }, [dayMode, setDateRange])

  const onNextWeekClick = useCallback(() => {
    setDateRange({
      startDate: date(startDate).add(1, dayMode ? 'day' : 'week'),
      endDate: date(endDate).add(1, dayMode ? 'day' : 'week'),
    })
  }, [setDateRange, startDate, dayMode, endDate])

  return (
    <header
      className={twMerge(
        'border-theme-border dark:border-dark-theme-border flex flex-none flex-wrap items-center justify-between gap-2 border-b px-4 py-2 lg:gap-4 lg:px-8 lg:py-4',
        className,
      )}
      {...props}
    >
      <HeadingText>{heading}</HeadingText>

      <div className="flex items-center">
        <div className="border-theme-border dark:border-dark-theme-border relative flex items-center rounded-xl border shadow-sm">
          <Button variant="secondaryNeutral" size="sm" className="border-0 shadow-none" onClick={onPreviousWeekClick}>
            <span className="sr-only">{dayMode ? 'Yesterday' : 'Previous week'}</span>

            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Button variant="secondaryNeutral" size="sm" className="border-0 shadow-none" onClick={onThisWeekClick}>
            {dayMode ? 'Today' : 'This Week'}
          </Button>

          <Button variant="secondaryNeutral" size="sm" className="border-0 shadow-none" onClick={onNextWeekClick}>
            <span className="sr-only">{dayMode ? 'Tomorrow' : 'Next week'}</span>

            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  )
}
