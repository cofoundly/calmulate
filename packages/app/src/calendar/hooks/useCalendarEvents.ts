import { filterEventsByDateRange } from '../utils/filterEventsByDateRange'
import { useCachedCalendarEvents } from './useCachedCalendarEvents'
import { useICalCalendarEvents } from './useICalCalendarEvents'
import { useSyncCalendarEventsWithCache } from './useSyncCalendarEventsWithCache'

export const useCalendarEvents = (dateRange?: { startDate: string; endDate: string }) => {
  // get the local calendar data
  const [cachedEvents] = useCachedCalendarEvents()

  // fetch the iCal calendar data
  const { data: iCalCalendarEvents, ...iCalCalendarEventsQuery } = useICalCalendarEvents()

  // sync the iCal calendar data with the cached calendar data
  useSyncCalendarEventsWithCache(iCalCalendarEvents)

  // filter the events by the date range
  let events = Object.values(cachedEvents)

  if (dateRange) {
    events = filterEventsByDateRange({
      events,
      ...dateRange,
    })
  }

  return {
    ...iCalCalendarEventsQuery,
    data: events,
  }
}
