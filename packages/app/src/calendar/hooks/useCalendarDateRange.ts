import { atom, useAtom } from 'jotai'

import { date } from '@/date'

const startOfWeek = date().startOf('isoWeek')
const endOfWeek = date().endOf('isoWeek')

const calendarDateRangeAtom = atom<{
  startDate: date.Dayjs
  endDate: date.Dayjs
}>({
  startDate: startOfWeek,
  endDate: endOfWeek,
})

export const useCalendarDateRange = () => useAtom(calendarDateRangeAtom)
