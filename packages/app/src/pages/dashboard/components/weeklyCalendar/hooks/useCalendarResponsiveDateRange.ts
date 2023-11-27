import { useWindowSize } from '@uidotdev/usehooks'
import { useEffect } from 'react'

import { useCalendarDateRange } from '@/calendar/hooks/useCalendarDateRange'
import { isDayMode } from '@/calendar/utils/isDayMode'
import { date } from '@/date'

const MD_BREAKPOINT = 640

export const useCalendarResponsiveDateRange = () => {
  const [{ startDate, endDate }, setDateRange] = useCalendarDateRange()
  const { width: windowWidth } = useWindowSize()

  const dayMode = isDayMode({ startDate, endDate })

  useEffect(() => {
    // if the window width is less than the breakpoint, we want to show the day mode
    if (windowWidth && !dayMode && windowWidth < MD_BREAKPOINT) {
      setDateRange({
        startDate: date().startOf('day'),
        endDate: date().endOf('day'),
      })
    }

    // if the window width is greater than the breakpoint, we want to show the week mode
    if (windowWidth && dayMode && windowWidth >= MD_BREAKPOINT) {
      setDateRange({
        startDate: date().startOf('isoWeek'),
        endDate: date().endOf('isoWeek'),
      })
    }
  }, [dayMode, setDateRange, windowWidth])
}
