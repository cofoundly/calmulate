import { TinyText } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { CalendarEvent as CalendarEventProps } from '@/calendar/models'
import { date } from '@/date'

type Props = ComponentPropsWithoutRef<'div'> & {
  event: CalendarEventProps
}

// TODO: SS handle event types and colours
export const CalendarEvent = ({ className = '', event, ...props }: Props) => {
  return (
    <div
      className={twMerge('group flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 hover:bg-blue-100', className)}
      {...props}
    >
      <TinyText className="text-blue-500 group-hover:text-blue-700">
        <time dateTime={event.start}>{date(event.start).format('HH:mm A')}</time>
      </TinyText>

      <TinyText className="font-semibold text-blue-700">{event.title}</TinyText>
    </div>
  )
}
