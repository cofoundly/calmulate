import { TinyText } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { CalendarEvent as CalendarEventProps, CalendarEventCategory } from '@/calendar/models'
import { date } from '@/date'

type Props = ComponentPropsWithoutRef<'div'> & {
  event: CalendarEventProps
  category?: CalendarEventCategory // the category may not exist
}

export const CalendarEvent = ({ className = '', event, category, ...props }: Props) => {
  const categoryColor = category?.color ?? 'gray'

  return (
    <div
      className={twMerge(
        `group flex flex-col gap-y-1 overflow-y-auto rounded-lg bg-${categoryColor}-50 p-2 hover:bg-${categoryColor}-100 dark:bg-${categoryColor}-950 dark:hover:bg-${categoryColor}-900`,
        className,
      )}
      {...props}
    >
      <TinyText
        className={`text-${categoryColor}-500 group-hover:text-${categoryColor}-700 dark:text-${categoryColor}-400 dark:group-hover:text-${categoryColor}-200`}
      >
        <time dateTime={event.startDate}>{date(event.startDate).format('HH:mm A')}</time>
      </TinyText>

      <TinyText className={`font-semibold text-${categoryColor}-700 dark:text-${categoryColor}-200`}>
        {event.summary} ({event.category})
      </TinyText>
    </div>
  )
}
