import { date } from '@/date'

export const isDayMode = ({ startDate, endDate }: { startDate: string; endDate: string }) =>
  // the calendar is in day mode if the start and end dates are the same day
  date(startDate).isSame(date(endDate), 'day')
