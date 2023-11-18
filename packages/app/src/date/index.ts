import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'

// set the default timezone to the user's timezone
dayjs.extend(utc)
dayjs.extend(timezone)
const tz = dayjs.tz.guess()
dayjs.tz.setDefault(tz)

// change the week start to Monday
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekStart: 1,
})

// allows us to get the iso day of week
dayjs.extend(isoWeek)

// TODO: SS later on timezone and weekStart could be configurable in which case we'd use a hook for date, ie. useDate
export { dayjs as date }
