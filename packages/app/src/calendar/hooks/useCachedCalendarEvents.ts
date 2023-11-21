import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { CalendarEvent } from '../models'

const atom = atomWithStorage<Record<CalendarEvent['id'], CalendarEvent>>('calendarEvents', {})

export const useCachedCalendarEvents = () => useAtom(atom)
