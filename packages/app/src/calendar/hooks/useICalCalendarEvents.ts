import { parseICalData } from '../utils/parseICalData'
import { useCalendarEventCategories } from './useCalendarEventCategories'
import { useICalCalendarData } from './useICalCalendarData'
import { useICalCalendarUrl } from './useICalCalendarUrl'

export const useICalCalendarEvents = () => {
  // fetch any new calendar data
  const [iCalCalendarUrl] = useICalCalendarUrl()
  const { data = '', ...iCalCalendarDataQuery } = useICalCalendarData(iCalCalendarUrl)

  const [categories] = useCalendarEventCategories()

  // parse the calendar data
  const events = parseICalData({ data, categories })

  return {
    data: events,
    ...iCalCalendarDataQuery,
  }
}
