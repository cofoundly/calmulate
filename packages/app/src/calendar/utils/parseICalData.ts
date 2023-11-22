import ical from 'ical'

import { date } from '@/date'

import { CalendarEvent, CalendarEventCategories } from '../models'
import { categoriseEvent } from './categoriseEvent'

export const parseICalData = ({
  data,
  categories,
}: {
  data: string
  categories: CalendarEventCategories
}): CalendarEvent[] => {
  const parsedData = ical.parseICS(data)

  const events = Object.values(parsedData).map(event => {
    const calendarEvent: CalendarEvent = {
      id: event.uid || '',
      summary: event.summary || '',
      description: event.description || '',
      createdDate: date(event.created).toISOString() || '',
      lastModifiedDate: date(event.lastmodified).toISOString() || '',
      startDate: date(event.start).toISOString() || '',
      endDate: date(event.end).toISOString() || '',
      category: 'unspecified',
    }

    calendarEvent.category = categoriseEvent(calendarEvent, categories)

    return calendarEvent
  })

  return events
}
