import { TinyText } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { CalendarEvent as CalendarEventProps, CalendarEventCategory } from '@/calendar/models'
import { date } from '@/date'

type Props = ComponentPropsWithoutRef<'div'> & {
  event: CalendarEventProps
  category: CalendarEventCategory
}

export const CalendarEvent = ({ className = '', event, category, ...props }: Props) => {
  return (
    <div
      className={twMerge(
        `group flex flex-col gap-y-1 overflow-y-auto rounded-lg bg-${category.color}-50 p-2 hover:bg-${category.color}-100 dark:bg-${category.color}-950 dark:hover:bg-${category.color}-900`,
        className,
      )}
      {...props}
    >
      <TinyText
        className={`text-${category.color}-500 group-hover:text-${category.color}-700 dark:text-${category.color}-400 dark:group-hover:text-${category.color}-200`}
      >
        <time dateTime={event.startDate}>{date(event.startDate).format('HH:mm A')}</time>
      </TinyText>

      <TinyText className={`font-semibold text-${category.color}-700 dark:text-${category.color}-200`}>
        {event.summary}
      </TinyText>
    </div>
  )
}
