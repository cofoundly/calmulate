import { MetricSettings } from '../hooks/useMetricSettings'
import { MetricCriteria } from '../models'

export const getFailedMetricCriteriaSuggestions = (metricCriteria: MetricCriteria, metricSettings: MetricSettings) => {
  switch (metricCriteria) {
    case MetricCriteria.BackToBackMeetings:
      return `Schedule meetings with a buffer time of at least ${metricSettings.minGapBetweenMeetings} minutes in between.`
    case MetricCriteria.WorkEventsBeforeWorkingHours:
      return `Avoid scheduling work events before ${metricSettings.workStartTime}.`
    case MetricCriteria.WorkEventsDuringLunch:
      return `Avoid scheduling work events from ${metricSettings.lunchBreakStartTime} to ${metricSettings.lunchBreakEndTime}.`
    case MetricCriteria.WorkEventsAfterWorkingHours:
      return `Avoid scheduling work events after ${metricSettings.workEndTime}.`
    case MetricCriteria.UnreasonableMeetingDurations:
      return `Schedule meetings with durations less than ${metricSettings.maxMeetingDuration}.`
    case MetricCriteria.UnreasonableDailyMeetingDuration:
      return `Schedule meetings with a total daily duration less than ${metricSettings.maxDailyMeetingDuration}.`
    case MetricCriteria.NoScheduledBreaksWithinWorkingHours:
      return `Schedule breaks between ${metricSettings.workStartTime} and ${metricSettings.workEndTime}.`
    case MetricCriteria.UnreasonableDailyWorkingDuration:
      return `Schedule work activities with a total daily duration less than ${metricSettings.maxDailyWorkingDuration}.`
    case MetricCriteria.LastMinuteWorkAdditionsToCalendar:
      return `Avoid scheduling work activities less than ${metricSettings.minNoticeForWorkEvents} minutes before their start time.`
    case MetricCriteria.ScheduledFocusTime:
      return `Schedule focus time.`
    case MetricCriteria.VarietyInWorkEvents:
      return `Schedule at least ${metricSettings.minVarietyInWorkEvents} types of work events.`
    case MetricCriteria.ScheduledReviewOrPlanningTime:
      return `Schedule review or planning time.`
    case MetricCriteria.EffectiveUseOfBreaks:
      return `Schedule breaks with a duration of at least ${metricSettings.minEffectiveBreakDuration} minutes after working blocks of ${metricSettings.maxWorkBlockDuration} minutes.`
    case MetricCriteria.NoOverlappingEvents:
      return `Avoid scheduling events that overlap.`
    case MetricCriteria.SticksToDefinedWorkingHours:
      return `Stick to your defined working hours of ${metricSettings.workStartTime} to ${metricSettings.workEndTime}.`
    case MetricCriteria.PersonalEventsScheduled:
      return `Schedule personal events.`
    case MetricCriteria.FlexibleWorkSchedule:
      return `Schedule personal events during working hours of ${metricSettings.workStartTime} to ${metricSettings.workEndTime}.`
    case MetricCriteria.TimeForSelfCare:
      return `Schedule time for self care.`
    case MetricCriteria.EveningWindDownTime:
      return `Avoid scheduling events after ${metricSettings.dailyCutOffTime}.`
    case MetricCriteria.EventsForPhysicalHealth:
      return `Schedule events for physical health.`
    case MetricCriteria.SocialOrFamilyTimeScheduled:
      return `Schedule social or family time.`
    case MetricCriteria.RegularBreaksAndDowntime:
      return `Schedule regular breaks and downtime.`
  }
}
