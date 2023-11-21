import { atom, useAtom } from 'jotai'

import { date } from '@/date'

const startOfWeek = date().startOf('isoWeek').toISOString()
const endOfWeek = date().endOf('isoWeek').toISOString()

const calendarDateRangeAtom = atom<{
  startDate: string
  endDate: string
}>({
  startDate: startOfWeek,
  endDate: endOfWeek,
})

export const useCalendarDateRange = () => useAtom(calendarDateRangeAtom)
