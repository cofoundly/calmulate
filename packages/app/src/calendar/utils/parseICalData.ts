import ical from 'ical'

import { date } from '@/date'

import { CalendarEvent } from '../models'

export const parseICalData = (iCalData: string): CalendarEvent[] => {
  const data = ical.parseICS(iCalData)

  const events = Object.values(data).map(event => {
    const calendarEvent: CalendarEvent = {
      id: event.uid || '',
      title: event.summary || '',
      start: date(event.start).toISOString() || '',
      end: date(event.end).toISOString() || '',
    }

    return calendarEvent
  })

  return events
}
