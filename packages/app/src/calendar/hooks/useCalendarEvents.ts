import { filterEventsByDateRange } from '../utils/filterEventsByDateRange'
import { parseICalData } from '../utils/parseICalData'
import { useCalendarData } from './useCalendarData'
import { useCalendarDateRange } from './useCalendarDateRange'
import { useCalendarUrl } from './useCalendarUrl'

export const useCalendarEvents = () => {
  // fetch the calendar data
  const [calendarUrl] = useCalendarUrl()
  const { data: calendarData = '', ...calendarDataQuery } = useCalendarData(calendarUrl)

  // parse the calendar data
  const events = parseICalData(calendarData)

  // filter the events by the date range
  const [{ startDate, endDate }] = useCalendarDateRange()
  const eventsForDateRange = filterEventsByDateRange({ events, startDate, endDate })

  return {
    data: eventsForDateRange,
    ...calendarDataQuery,
  }
}
