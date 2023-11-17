import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@/types'

import { fetchCalendarData } from '../api/fetchCalendarData'

export const useCalendarData = (url: string) => {
  return useQuery({
    queryKey: [QueryKeys.CalendarData, url],
    queryFn: () => fetchCalendarData(url),
    enabled: Boolean(url),
  })
}
