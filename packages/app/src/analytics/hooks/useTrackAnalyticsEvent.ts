import { useCallback } from 'react'

import { trackAnalyticsEvent } from '../api/mixpanel'
import { AnalyticsEvent, AnalyticsEventData } from '../models'

export const useTrackAnalyticsEvent = () => {
  const trackAnalyticsEventCb = useCallback(<T extends AnalyticsEvent>(event: T, data?: AnalyticsEventData[T]) => {
    trackAnalyticsEvent(event, data)
  }, [])

  return trackAnalyticsEventCb
}
