import isEqual from 'lodash.isequal'
import { useEffect, useRef } from 'react'

import { CalendarEvent } from '../models'
import { useCachedCalendarEvents } from './useCachedCalendarEvents'

export const useSyncCalendarEventsWithCache = (events: CalendarEvent[]) => {
  const [cachedCalendarEvents, setCachedCalendarEvents] = useCachedCalendarEvents()

  // keep a reference to the previous cached events so we can compare them to the current cached events
  // this is to prevent an infinite loop of updates
  const prevCachedEventsRef = useRef<Record<CalendarEvent['id'], CalendarEvent>>()

  useEffect(
    () => {
      if (!events.length || isEqual(prevCachedEventsRef.current, cachedCalendarEvents)) {
        return
      }

      // sync the iCal calendar data with the cached calendar data => overwrite the cached data with the iCal data except for the category
      const newCachedCalendarEvents = events.reduce((acc, event) => {
        const cachedEvent = cachedCalendarEvents[event.id]
        const newEvent: CalendarEvent = {
          ...event,
          // add any user editable fields here so that they aren't overridden by the iCal data
          // TODO: SS we should also take into account, similarly categorised events
          category: cachedEvent?.category || event.category,
        }

        return {
          ...acc,
          [event.id]: newEvent,
        }
      }, {})

      setCachedCalendarEvents(newCachedCalendarEvents)

      prevCachedEventsRef.current = cachedCalendarEvents
    },
    // intentionally ignoring the cahcedCalendarEvents dependency
    // eslint-disable-next-line
    [events, setCachedCalendarEvents],
  )
}
