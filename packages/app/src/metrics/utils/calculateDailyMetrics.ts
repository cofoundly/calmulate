import { filterEventsByDateRange } from '@/calendar/utils/filterEventsByDateRange'
import { date } from '@/date'

import { CalendarEvent, CalendarEventCategoryId } from '../../calendar/models'
import { MetricSettings } from '../hooks/useMetricSettings'

const hasBackToBackMeetings = ({
  events,
  meetingCategories,
  minGapBetweenMeetings,
}: {
  events: CalendarEvent[]
  meetingCategories: CalendarEventCategoryId[]
  minGapBetweenMeetings: number
}): boolean => {
  return events
    .filter(event => meetingCategories.includes(event.category))
    .every((event, index, array) => {
      if (index === 0 || index === array.length - 1) {
        return true
      }

      const nextEvent = array[index + 1]
      const durationUntilNextMeeting = date(event.endDate).diff(nextEvent.startDate, 'minutes')

      return durationUntilNextMeeting < minGapBetweenMeetings
    })
}

const getTimeForDay = ({ day, time }: { day: string; time: string }) => {
  const hours = Number(time.split(':')[0])
  const minutes = Number(time.split(':')[1])

  return date(day).startOf('day').hour(hours).minute(minutes)
}

const hasWorkActivitiesBeforeWorkingHours = ({
  events,
  workStartTime,
  workCategories,
}: {
  events: CalendarEvent[]
  workStartTime: string
  workCategories: CalendarEventCategoryId[]
}): boolean => {
  return events
    .filter(event => workCategories.includes(event.category))
    .some(event => date(event.startDate).isBefore(getTimeForDay({ day: event.startDate, time: workStartTime })))
}

const hasWorkActivitiesDuringLunchBreak = ({
  events,
  lunchBreakStartTime,
  lunchBreakEndTime,
  workCategories,
}: {
  events: CalendarEvent[]
  lunchBreakStartTime: string
  lunchBreakEndTime: string
  workCategories: CalendarEventCategoryId[]
}): boolean => {
  return events
    .filter(event => workCategories.includes(event.category))
    .some(
      event =>
        // any event that started after lunch time
        (date(event.startDate).isAfter(getTimeForDay({ day: event.startDate, time: lunchBreakStartTime })) &&
          // but not after the end of lunch time => otherwise it's just an event scheduled after lunch
          date(event.startDate).isBefore(getTimeForDay({ day: event.startDate, time: lunchBreakEndTime }))) ||
        // any event that started before lunch time
        (date(event.startDate).isBefore(getTimeForDay({ day: event.startDate, time: lunchBreakStartTime })) &&
          // but ended after the start of lunch time => it ran over into lunch time
          !date(event.endDate).isAfter(getTimeForDay({ day: event.startDate, time: lunchBreakStartTime }))),
    )
}

const hasWorkActivitiesAfterWorkingHours = ({
  events,
  workEndTime,
  workCategories,
}: {
  events: CalendarEvent[]
  workEndTime: string
  workCategories: CalendarEventCategoryId[]
}): boolean => {
  return events
    .filter(event => workCategories.includes(event.category))
    .some(event => date(event.endDate).isAfter(getTimeForDay({ day: event.startDate, time: workEndTime })))
}

const hasUnreasonableMeetingDurations = ({
  events,
  meetingCategories,
  maxMeetingDuration,
}: {
  events: CalendarEvent[]
  meetingCategories: CalendarEventCategoryId[]
  maxMeetingDuration: number
}): boolean => {
  return events
    .filter(event => meetingCategories.includes(event.category))
    .some(event => date(event.endDate).diff(event.startDate, 'minutes') > maxMeetingDuration)
}

const hasUnreasonableDailyMeetingDuration = ({
  events,
  meetingCategories,
  maxDailyMeetingDuration,
}: {
  events: CalendarEvent[]
  meetingCategories: CalendarEventCategoryId[]
  maxDailyMeetingDuration: number
}): boolean => {
  const totalMeetingDuration = events
    .filter(event => meetingCategories.includes(event.category))
    .reduce((total, event) => total + date(event.endDate).diff(event.startDate, 'minutes'), 0)

  return totalMeetingDuration > maxDailyMeetingDuration
}

const hasNoScheduledBreaks = ({
  events,
  workCategories,
  breakCategories,
}: {
  events: CalendarEvent[]
  workCategories: CalendarEventCategoryId[]
  breakCategories: CalendarEventCategoryId[]
}): boolean => {
  // we check for scheduled break between the first and last work-related activity so that we exclude breaks before or after hours
  // we don't use reported working hours because they might not be accurate
  const workStarted = events.find(event => workCategories.includes(event.category))?.startDate
  const workEnded = [...events].reverse().find(event => workCategories.includes(event.category))?.endDate

  if (!workStarted || !workEnded) {
    return false
  }

  const eventsBetweenWorkActivities = filterEventsByDateRange({
    events,
    startDate: workStarted,
    endDate: workEnded,
  })

  return !eventsBetweenWorkActivities.some(event => breakCategories.includes(event.category))
}

const hasUnreasonableDailyWorkingDuration = ({
  events,
  workCategories,
  maxWorkingHours,
}: {
  events: CalendarEvent[]
  workCategories: CalendarEventCategoryId[]
  maxWorkingHours: number
}): boolean => {
  const totalWorkingHours = events
    .filter(event => workCategories.includes(event.category))
    .reduce((total, event) => total + date(event.endDate).diff(event.startDate, 'hours'), 0)

  return totalWorkingHours > maxWorkingHours
}

const hasLastMinuteWorkAdditionsToCalendar = ({
  events,
  workCategories,
  minNoticeForWorkEvents,
}: {
  events: CalendarEvent[]
  workCategories: CalendarEventCategoryId[]
  minNoticeForWorkEvents: number
}): boolean => {
  return events
    .filter(event => workCategories.includes(event.category))
    .some(event => date(event.lastModifiedDate).diff(event.startDate, 'minutes') < minNoticeForWorkEvents)
}

const hasScheduledFocusTime = ({
  events,
  focusedWorkCategories,
}: {
  events: CalendarEvent[]

  focusedWorkCategories: CalendarEventCategoryId[]
}) => {
  return events.some(event => focusedWorkCategories.includes(event.category))
}

// check that the events aren't too similar
const hasVarietyInWorkEvents = ({
  events,
  workCategories,
  minVarietyInWorkEvents,
}: {
  events: CalendarEvent[]
  workCategories: CalendarEventCategoryId[]
  minVarietyInWorkEvents: number
}) => {
  const workEvents = events.filter(event => workCategories.includes(event.category))
  const workEventSummaries = workEvents.map(event => event.summary)
  const uniqueEventSummaries = [...new Set(workEventSummaries)]

  return uniqueEventSummaries.length > minVarietyInWorkEvents
}

const hasScheduledPlanningOrReviewTime = ({
  events,
  planningCategories,
}: {
  events: CalendarEvent[]
  planningCategories: CalendarEventCategoryId[]
}) => {
  return events.some(event => planningCategories.includes(event.category))
}

const hasEffectiveUseOfBreaks = ({
  events,
  workCategories,
  maxWorkBlockDuration,
  minEffectiveBreakDuration,
}: {
  events: CalendarEvent[]
  workCategories: CalendarEventCategoryId[]
  maxWorkBlockDuration: number
  minEffectiveBreakDuration: number
}) => {
  let currentWorkBlockDuration = 0
  let lastEventEnd: date.Dayjs | null = null
  let isFollowingBreakEffective = true

  events.forEach(event => {
    const eventStart = date(event.startDate)
    const eventEnd = date(event.endDate)

    if (lastEventEnd) {
      const gapDuration = eventStart.diff(lastEventEnd, 'minutes')

      if (gapDuration >= minEffectiveBreakDuration) {
        // Reset work block duration if the gap is long enough to be a break
        currentWorkBlockDuration = 0
      }
    }

    if (workCategories.includes(event.category)) {
      currentWorkBlockDuration += eventEnd.diff(eventStart, 'minutes')

      if (currentWorkBlockDuration > maxWorkBlockDuration) {
        isFollowingBreakEffective = false // Work block exceeded max duration without a break
      }
    } else {
      currentWorkBlockDuration = 0 // Reset for next work block
    }

    lastEventEnd = eventEnd // Update last event end time for next iteration
  })

  // Final check if last work block exceeded max duration without a break
  if (currentWorkBlockDuration > maxWorkBlockDuration) {
    isFollowingBreakEffective = false
  }

  return isFollowingBreakEffective
}

const hasBufferTimeBetweenWorkEvents = ({
  events,
  workCategories,
  minBufferTimeBetweenWorkEvents,
}: {
  events: CalendarEvent[]
  workCategories: CalendarEventCategoryId[]
  minBufferTimeBetweenWorkEvents: number
}): boolean => {
  let realisticSchedulingScore = 0
  let lastWorkEventEnd: date.Dayjs | null = null

  events.forEach(event => {
    const eventStart = date(event.startDate)
    const eventEnd = date(event.endDate)

    // Only consider work-related events for buffer time calculation
    if (workCategories.includes(event.category)) {
      // Check if there's adequate buffer time since last work event
      if (lastWorkEventEnd && eventStart.diff(lastWorkEventEnd, 'minute') < minBufferTimeBetweenWorkEvents) {
        // Less than 10 minutes buffer
        realisticSchedulingScore -= 1
      }

      lastWorkEventEnd = eventEnd
    }
  })

  return realisticSchedulingScore === 0
}

const hasOverlappingEvents = ({ events }: { events: CalendarEvent[] }): boolean => {
  for (let i = 0; i < events.length - 1; i++) {
    const currentEnd = date(events[i].endDate)

    for (let j = i + 1; j < events.length; j++) {
      const nextStart = date(events[j].startDate)

      // Check if the current event's end time is greater than the next event's start time
      if (currentEnd.isAfter(nextStart)) {
        return true // There is an overlap
      }
    }
  }

  return false // No overlaps found
}

const hasPersonalEventsScheduled = ({
  events,
  personalCategories,
}: {
  events: CalendarEvent[]
  personalCategories: CalendarEventCategoryId[]
}): boolean => {
  return events.some(event => personalCategories.includes(event.category))
}

const hasPersonalEventsDuringWorkingHours = ({
  events,
  workStartTime,
  workEndTime,
  personalCategories,
}: {
  events: CalendarEvent[]
  workStartTime: string
  workEndTime: string
  personalCategories: CalendarEventCategoryId[]
}): boolean => {
  return events
    .filter(
      event =>
        date(event.startDate).isAfter(getTimeForDay({ day: event.startDate, time: workStartTime })) &&
        date(event.startDate).isBefore(getTimeForDay({ day: event.startDate, time: workEndTime })),
    )
    .some(event => personalCategories.includes(event.category))
}

const hasSelfCareEventsScheduled = ({
  events,
  selfCareCategories,
}: {
  events: CalendarEvent[]
  selfCareCategories: CalendarEventCategoryId[]
}): boolean => {
  return events.some(event => selfCareCategories.includes(event.category))
}

function hasNoEventsAfterCutoff({ events, cutoffTime }: { events: CalendarEvent[]; cutoffTime: string }): boolean {
  return !events.some(event => {
    const eventStart = date(event.startDate)
    const cutoff = date(cutoffTime)

    return eventStart.isAfter(cutoff)
  })
}

const hasExerciseEventsScheduled = ({
  events,
  exerciseCategories,
}: {
  events: CalendarEvent[]
  exerciseCategories: CalendarEventCategoryId[]
}): boolean => {
  return events.some(event => exerciseCategories.includes(event.category))
}

const hasSocialEventsScheduled = ({
  events,
  socialCategories,
}: {
  events: CalendarEvent[]
  socialCategories: CalendarEventCategoryId[]
}): boolean => {
  return events.some(event => socialCategories.includes(event.category))
}

export const calculateDailyMetrics = (
  events: CalendarEvent[],
  settings: MetricSettings,
): {
  stress: number
  productivity: number
  balance: number
} => {
  // stress criteria
  const backToBackMeetings = hasBackToBackMeetings({
    events,
    meetingCategories: settings.meetingCategories,
    minGapBetweenMeetings: settings.minGapBetweenMeetings,
  })
  const workActivitiesBeforeWorkingHours = hasWorkActivitiesBeforeWorkingHours({
    events,
    workStartTime: settings.workStartTime,
    workCategories: settings.workCategories,
  })
  const workActivitiesDuringLunch = hasWorkActivitiesDuringLunchBreak({
    events,
    lunchBreakStartTime: settings.lunchBreakStartTime,
    lunchBreakEndTime: settings.lunchBreakEndTime,
    workCategories: settings.workCategories,
  })
  const workActivitiesAfterWorkingHours = hasWorkActivitiesAfterWorkingHours({
    events,
    workEndTime: settings.workEndTime,
    workCategories: settings.workCategories,
  })
  const unreasonableMeetingDurations = hasUnreasonableMeetingDurations({
    events,
    meetingCategories: settings.meetingCategories,
    maxMeetingDuration: settings.maxMeetingDuration,
  })
  const unreasonableDailyMeetingDuration = hasUnreasonableDailyMeetingDuration({
    events,
    meetingCategories: settings.meetingCategories,
    maxDailyMeetingDuration: settings.maxDailyMeetingDuration,
  })
  const noScheduledBreaksWithinWorkingHours = hasNoScheduledBreaks({
    events,
    workCategories: settings.workCategories,
    breakCategories: settings.breakCategories,
  })
  const unreasonableDailyWorkingDuration = hasUnreasonableDailyWorkingDuration({
    events,
    workCategories: settings.workCategories,
    maxWorkingHours: settings.maxDailyWorkingDuration,
  })
  const lastMinuteWorkAdditionsToCalendar = hasLastMinuteWorkAdditionsToCalendar({
    events,
    workCategories: settings.workCategories,
    minNoticeForWorkEvents: settings.minNoticeForWorkEvents,
  })

  const stressCriteria = [
    backToBackMeetings,
    workActivitiesBeforeWorkingHours,
    workActivitiesDuringLunch,
    workActivitiesAfterWorkingHours,
    unreasonableMeetingDurations,
    unreasonableDailyMeetingDuration,
    noScheduledBreaksWithinWorkingHours,
    unreasonableDailyWorkingDuration,
    lastMinuteWorkAdditionsToCalendar,
  ]
  const stressPoints = stressCriteria.filter(criteria => criteria).length
  const stressMetric = Math.round((100 * stressPoints) / stressCriteria.length)

  // productivity criteria
  const scheduledFocusTime = hasScheduledFocusTime({ events, focusedWorkCategories: settings.focusedWorkCategories })
  const varietyInWorkEvents = hasVarietyInWorkEvents({
    events,
    workCategories: settings.workCategories,
    minVarietyInWorkEvents: settings.minVarietyInWorkEvents,
  })
  const scheduledReviewOrPlanningTime = hasScheduledPlanningOrReviewTime({
    events,
    planningCategories: settings.planningCategories,
  })
  const effectiveUseOfBreaks = hasEffectiveUseOfBreaks({
    events,
    workCategories: settings.workCategories,
    maxWorkBlockDuration: settings.maxWorkBlockDuration,
    minEffectiveBreakDuration: settings.minEffectiveBreakDuration,
  })
  const bufferTimeBetweenWorkEvents = hasBufferTimeBetweenWorkEvents({
    events,
    workCategories: settings.workCategories,
    minBufferTimeBetweenWorkEvents: settings.minBufferTimeBetweenWorkEvents,
  })
  const noOverlappingEvents = !hasOverlappingEvents({ events })

  const productivityCriteria = [
    scheduledFocusTime,
    varietyInWorkEvents,
    scheduledReviewOrPlanningTime,
    effectiveUseOfBreaks,
    bufferTimeBetweenWorkEvents,
    noOverlappingEvents,
  ]
  const productivityPoints = productivityCriteria.filter(criteria => criteria).length
  const productivityMetric = Math.round((100 * productivityPoints) / productivityCriteria.length)

  // balance criteria
  const sticksToDefinedWorkingHours =
    !workActivitiesBeforeWorkingHours && !workActivitiesDuringLunch && !workActivitiesAfterWorkingHours
  const personalEventsScheduled = hasPersonalEventsScheduled({
    events,
    personalCategories: settings.personalCategories,
  })
  const flexibleWorkSchedule = hasPersonalEventsDuringWorkingHours({
    events,
    workStartTime: settings.workStartTime,
    workEndTime: settings.workEndTime,
    personalCategories: settings.personalCategories,
  })
  const timeForSelfCare = hasSelfCareEventsScheduled({
    events,
    selfCareCategories: settings.selfCareCategories,
  })
  const eveningWindDownTime = hasNoEventsAfterCutoff({
    events,
    cutoffTime: settings.cutOffTime,
  })
  const activitiesForPhysicalHealth = hasExerciseEventsScheduled({
    events,
    exerciseCategories: settings.exerciseCategories,
  })
  const socialOrFamilyTimeScheduled = hasSocialEventsScheduled({ events, socialCategories: settings.socialCategories })
  const regularBreaksAndDowntime = effectiveUseOfBreaks

  const balanceCriteria: boolean[] = [
    sticksToDefinedWorkingHours,
    personalEventsScheduled,
    flexibleWorkSchedule,
    timeForSelfCare,
    eveningWindDownTime,
    activitiesForPhysicalHealth,
    socialOrFamilyTimeScheduled,
    regularBreaksAndDowntime,
  ]
  const balancePoints = balanceCriteria.filter(criteria => criteria).length
  const balanceMetric = Math.round((100 * balancePoints) / balanceCriteria.length)

  return {
    stress: stressMetric,
    productivity: productivityMetric,
    balance: balanceMetric,
  }
}
