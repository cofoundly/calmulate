import * as HeroIcons from '@heroicons/react/24/solid'
import { colors } from 'colors'

export type CalendarEventCategoryId =
  | 'meeting'
  | 'focusedWork'
  | 'dailyPlanning'
  | 'creativeThinking'
  | 'workTask'
  | 'teamBuilding'
  | 'networking'
  | 'exercise'
  | 'mealBreak'
  | 'medicalAppointment'
  | 'familyTime'
  | 'relaxation'
  | 'social'
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
  createdDate: string
  lastModifiedDate: string
  startDate: string
  endDate: string
  category: CalendarEventCategory['id']
}
