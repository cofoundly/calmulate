import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@/types'

import { fetchICalCalendarData } from '../api/fetchICalCalendarData'

export const useICalCalendarData = (url: string) => {
  return useQuery({
    queryKey: [QueryKeys.ICalCalendarData, url],
    queryFn: () => fetchICalCalendarData(url),
    // TODO: SS temporarily disabled for demo
    // enabled: Boolean(url),
  })
}
