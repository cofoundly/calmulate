import * as HeroIcons from '@heroicons/react/24/solid'
import { colors } from 'colors'

type CalendarEventCategoryId =
  | 'meeting'
  | 'deadline'
  | 'presentation'
  | 'focusedWork'
  | 'workTask'
  | 'teamBuilding'
  | 'networking'
  | 'exercise'
  | 'mealBreak'
  | 'medicalAppointment'
  | 'familyTime'
  | 'relaxation'
  | 'meditation'
  | 'socialEvent'
  | 'hobby'
  | 'travel'
  | 'personalDevelopment'
  | 'errands'
  | 'chores'
  | 'unspecified'

export type CalendarEventCategory = {
  id: CalendarEventCategoryId
  name: string
  color: typeof colors[number]
  icon: keyof typeof HeroIcons
  keywords: string[]
}

export type CalendarEventCategories = Record<CalendarEventCategory['id'], CalendarEventCategory>

export type CalendarEvent = {
  id: string
  summary: string
  description: string
  start: string
  end: string
  category: CalendarEventCategory['id']
}
