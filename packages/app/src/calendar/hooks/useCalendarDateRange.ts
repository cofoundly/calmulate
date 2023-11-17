import dayjs from 'dayjs'
import { atom, useAtom } from 'jotai'

const startOfWeek = dayjs().startOf('week').toISOString()
const endOfWeek = dayjs().endOf('week').toISOString()

const calendarDateRangeAtom = atom<{
  startDate: string
  endDate: string
}>({
  startDate: startOfWeek,
  endDate: endOfWeek,
})

export const useCalendarDateRange = () => useAtom(calendarDateRangeAtom)
