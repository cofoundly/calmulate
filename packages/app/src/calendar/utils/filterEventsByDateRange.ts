import { date } from '@/date'

import { CalendarEvent } from '../models'

export const filterEventsByDateRange = ({
  events,
  startDate,
  endDate,
}: {
  events: CalendarEvent[]
  startDate: date.Dayjs
  endDate: date.Dayjs
}) => {
  const start = startDate.startOf('day')
  const end = endDate.endOf('day')

  return events.filter(event => {
    const eventStart = date(event.startDate)

    return eventStart.isAfter(start) && eventStart.isBefore(end)
  })
}
