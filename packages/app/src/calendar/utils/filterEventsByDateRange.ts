import dayjs from 'dayjs'

import { parseICalData } from './parseICalData'

export const filterEventsByDateRange = ({
  events,
  startDate,
  endDate,
}: {
  events: Array<ReturnType<typeof parseICalData>['0']>
  startDate: dayjs.ConfigType
  endDate: dayjs.ConfigType
}) => {
  const start = dayjs(startDate).startOf('day')
  const end = dayjs(endDate).endOf('day')

  return events.filter(event => {
    const eventStart = dayjs(event.start)

    return eventStart.isAfter(start) && eventStart.isBefore(end)
  })
}
