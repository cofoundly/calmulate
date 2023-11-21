import { filterEventsByDateRange } from '../utils/filterEventsByDateRange'
import { useCachedCalendarEvents } from './useCachedCalendarEvents'
import { useCalendarDateRange } from './useCalendarDateRange'
import { useICalCalendarEvents } from './useICalCalendarEvents'
import { useSyncCalendarEventsWithCache } from './useSyncCalendarEventsWithCache'

export const useCalendarEvents = () => {
  // get the local calendar data
  const [events] = useCachedCalendarEvents()

  // fetch the iCal calendar data
  const { data: iCalCalendarEvents, ...iCalCalendarEventsQuery } = useICalCalendarEvents()

  // sync the iCal calendar data with the cached calendar data
  useSyncCalendarEventsWithCache(iCalCalendarEvents)

  // filter the events by the date range
  const [dateRange] = useCalendarDateRange()
  const eventsForDateRange = filterEventsByDateRange({
    events: Object.values(events),
    startDate: dateRange.start,
    endDate: dateRange.end,
  })

  return {
    ...iCalCalendarEventsQuery,
    data: eventsForDateRange,
  }
}
