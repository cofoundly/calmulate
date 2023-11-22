import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { CalendarEventCategoryId } from '@/calendar/models'

export type MetricSettings = {
  stressHigh: number
  stressAverage: number
  productivityHigh: number
  productivityAverage: number
  balanceHigh: number
  balanceAverage: number
  workStartTime: string
  workEndTime: string
  lunchBreakStartTime: string
  lunchBreakEndTime: string
  minGapBetweenMeetings: number
  maxMeetingDuration: number
  maxDailyMeetingDuration: number
  maxDailyWorkingDuration: number
  minNoticeForWorkEvents: number
  minVarietyInWorkEvents: number
  maxWorkBlockDuration: number
  minEffectiveBreakDuration: number
  minBufferTimeBetweenWorkEvents: number
  cutOffTime: string
  workCategories: CalendarEventCategoryId[]
  meetingCategories: CalendarEventCategoryId[]
  planningCategories: CalendarEventCategoryId[]
  focusedWorkCategories: CalendarEventCategoryId[]
  breakCategories: CalendarEventCategoryId[]
  personalCategories: CalendarEventCategoryId[]
  selfCareCategories: CalendarEventCategoryId[]
  exerciseCategories: CalendarEventCategoryId[]
  socialCategories: CalendarEventCategoryId[]
}

const atom = atomWithStorage<MetricSettings>('metricsSettings', {
  stressHigh: 70,
  stressAverage: 40,
  productivityHigh: 70,
  productivityAverage: 40,
  balanceHigh: 70,
  balanceAverage: 40,
  workStartTime: '09:00', // in "HH:mm" format
  workEndTime: '17:00', // in "HH:mm" format
  lunchBreakStartTime: '12:00', // in "HH:mm" format
  lunchBreakEndTime: '13:00', // in "HH:mm" format
  minGapBetweenMeetings: 15, // in minutes
  maxMeetingDuration: 60, // in minutes
  maxDailyMeetingDuration: 240, // in minutes
  maxDailyWorkingDuration: 8, // in hours
  minNoticeForWorkEvents: 60, // in minutes
  minVarietyInWorkEvents: 1, // in number of events
  maxWorkBlockDuration: 90, // in minutes
  minEffectiveBreakDuration: 5, // in minutes
  minBufferTimeBetweenWorkEvents: 10, // in minutes
  cutOffTime: '19:00', // in 'HH:mm' format
  workCategories: [
    'meeting',
    'focusedWork',
    'workTask',
    'teamBuilding',
    'networking',
    'dailyPlanning',
    'creativeThinking',
  ],
  meetingCategories: ['meeting'],
  planningCategories: ['dailyPlanning'],
  focusedWorkCategories: ['focusedWork'],
  breakCategories: ['exercise', 'mealBreak', 'familyTime', 'relaxation'],
  personalCategories: [
    'familyTime',
    'social',
    'hobby',
    'exercise',
    'relaxation',
    'travel',
    'personalDevelopment',
    'errands',
    'chores',
    'medicalAppointment',
  ],
  selfCareCategories: ['exercise', 'relaxation', 'hobby', 'personalDevelopment'],
  exerciseCategories: ['exercise'],
  socialCategories: ['social', 'familyTime', 'networking'],
})

export const useMetricSettings = () => useAtom(atom)
