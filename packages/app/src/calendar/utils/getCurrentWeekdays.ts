import { date } from '@/date'

export const getCurrentWeekdays = () => Array.from({ length: 7 }, (_, i) => date().startOf('isoWeek').add(i, 'day'))
