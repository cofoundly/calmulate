import { date } from '@/date'

import { CalendarEvent } from '../models'

export const filterEventsByDateRange = ({
  events,
  startDate,
  endDate,
}: {
  events: CalendarEvent[]
  startDate: string
  endDate: string
}) => {
  const start = date(startDate).startOf('day')
  const end = date(endDate).endOf('day')

  return events.filter(event => {
    const eventStart = date(event.start)

    return eventStart.isAfter(start) && eventStart.isBefore(end)
  })
}
