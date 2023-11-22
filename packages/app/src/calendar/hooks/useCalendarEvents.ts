import { filterEventsByDateRange } from '../utils/filterEventsByDateRange'
import { useICalCalendarEvents } from './useICalCalendarEvents'

export const useCalendarEvents = (dateRange?: { startDate: string; endDate: string }) => {
  // fetch the iCal calendar data
  const { data: iCalCalendarEvents, isFetching, ...iCalCalendarEventsQuery } = useICalCalendarEvents()

  // filter the events by the date range
  let events = iCalCalendarEvents

  if (dateRange) {
    events = filterEventsByDateRange({
      events,
      ...dateRange,
    })
  }

  return {
    ...iCalCalendarEventsQuery,
    // the query is only enabled when the iCal calendar is enabled so we need to use the isFetching state
    // we also remove isFetching from the query state to bring attention to this
    isLoading: isFetching,
    data: events,
  }
}
