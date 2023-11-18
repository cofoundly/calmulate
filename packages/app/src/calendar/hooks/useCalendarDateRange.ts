import { atom, useAtom } from 'jotai'

import { date } from '@/date'

const startOfWeek = date().startOf('isoWeek').toISOString()
const endOfWeek = date().endOf('isoWeek').toISOString()

const calendarDateRangeAtom = atom<{
  start: string
  end: string
}>({
  start: startOfWeek,
  end: endOfWeek,
})

export const useCalendarDateRange = () => useAtom(calendarDateRangeAtom)
