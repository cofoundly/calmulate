import { MetricSettings } from '../hooks/useMetricSettings'
import { MetricCriteria } from '../models'

export const getMetricCriteriaInfo = (metricCriteria: MetricCriteria, metricSettings: MetricSettings) => {
  switch (metricCriteria) {
    case MetricCriteria.BackToBackMeetings:
      return {
        label: 'No back to back meetings.',
        failReason: `Meetings found within ${metricSettings.minGapBetweenMeetings} minutes of each other.`,
      }
    case MetricCriteria.WorkEventsBeforeWorkingHours:
      return {
        label: 'No work events before working hours.',
        failReason: `Work events found before ${metricSettings.workStartTime}.`,
      }
    case MetricCriteria.WorkEventsDuringLunch:
      return {
        label: 'No work events during lunch.',
        failReason: `Work events found between ${metricSettings.lunchBreakStartTime} and ${metricSettings.lunchBreakEndTime}.`,
      }
    case MetricCriteria.WorkEventsAfterWorkingHours:
      return {
        label: 'No work events after working hours.',
        failReason: `Work events found after ${metricSettings.workEndTime}.`,
      }
    case MetricCriteria.UnreasonableMeetingDurations:
      return {
        label: 'Reasonable meeting durations.',
        failReason: `Meetings found with durations over ${metricSettings.maxMeetingDuration} minutes.`,
      }
    case MetricCriteria.UnreasonableDailyMeetingDuration:
      return {
        label: 'Reasonable daily meeting duration.',
        failReason: `Total daily meeting duration is over ${metricSettings.maxDailyMeetingDuration} minutes.`,
      }
    case MetricCriteria.NoScheduledBreaksWithinWorkingHours:
      return {
        label: 'Scheduled breaks within working hours.',
        failReason: `No breaks scheduled between ${metricSettings.workStartTime} and ${metricSettings.workEndTime}.`,
      }
    case MetricCriteria.UnreasonableDailyWorkingDuration:
      return {
        label: 'Reasonable daily working duration.',
        failReason: `Total daily work activity duration is over ${metricSettings.maxDailyWorkingDuration} minutes.`,
      }
    case MetricCriteria.LastMinuteWorkAdditionsToCalendar:
      return {
        label: 'No last minute work additions to calendar.',
        failReason: `Work activities were scheduled less than ${metricSettings.minNoticeForWorkEvents} minutes before their start time.`,
      }
    case MetricCriteria.ScheduledFocusTime:
      return { label: 'Scheduled focus time.', failReason: `No dedicated focus time events scheduled.` }
    case MetricCriteria.VarietyInWorkEvents:
      return {
        label: 'Variety in work events.',
        failReason: `Only ${metricSettings.minVarietyInWorkEvents} types of work events scheduled.`,
      }
    case MetricCriteria.ScheduledReviewOrPlanningTime:
      return { label: 'Scheduled review or planning time.', failReason: `No review or planning events scheduled.` }
    case MetricCriteria.EffectiveUseOfBreaks:
      return {
        label: 'Effective use of breaks.',
        failReason: `Breaks longer than ${metricSettings.minEffectiveBreakDuration} minutes not found between working blocks of ${metricSettings.maxWorkBlockDuration} minutes.`,
      }
    case MetricCriteria.NoOverlappingEvents:
      return { label: 'No overlapping events.', failReason: `Overlapping events found.` }
    case MetricCriteria.SticksToDefinedWorkingHours:
      return {
        label: 'Sticks to defined working hours.',
        failReason: `Work events found before ${metricSettings.workStartTime}, during lunch ${metricSettings.lunchBreakStartTime} - ${metricSettings.lunchBreakEndTime} or after ${metricSettings.workEndTime}.`,
      }
    case MetricCriteria.PersonalEventsScheduled:
      return { label: 'Personal events scheduled.', failReason: `No personal events scheduled.` }
    case MetricCriteria.FlexibleWorkSchedule:
      return {
        label: 'Flexible work schedule.',
        failReason: `No personal events scheduled during working hours ${metricSettings.workStartTime} - ${metricSettings.workEndTime}.`,
      }
    case MetricCriteria.TimeForSelfCare:
      return { label: 'Time for self care.', failReason: `No self-care events scheduled.` }
    case MetricCriteria.EveningWindDownTime:
      return {
        label: 'Evening wind down time.',
        failReason: `Events scheduled after daily cut-off time ${metricSettings.dailyCutOffTime}.`,
      }
    case MetricCriteria.EventsForPhysicalHealth:
      return { label: 'Events for physical health.', failReason: `No physical health events scheduled.` }
    case MetricCriteria.SocialOrFamilyTimeScheduled:
      return { label: 'Social or family time scheduled.', failReason: `No social events scheduled.` }
    case MetricCriteria.RegularBreaksAndDowntime:
      return {
        label: 'Regular breaks and downtime.',
        failReason: `Breaks longer than ${metricSettings.minEffectiveBreakDuration} minutes not found between working blocks of ${metricSettings.maxWorkBlockDuration} minutes.`,
      }
  }
}
