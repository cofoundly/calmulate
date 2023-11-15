import { useCallback } from 'react'

import { useTrackAnalyticsEvent } from '@/analytics/hooks/useTrackAnalyticsEvent'
import { AnalyticsEvent, AnalyticsPrimaryButtonName } from '@/analytics/models'

export const usePrimaryActionClick = () => {
  const trackAnalyticsEvent = useTrackAnalyticsEvent()

  const onPrimaryActionClick = useCallback(
    ({ buttonName }: { buttonName: AnalyticsPrimaryButtonName }) => {
      trackAnalyticsEvent(AnalyticsEvent.PrimaryActionClicked, {
        buttonName,
      })
    },
    [trackAnalyticsEvent],
  )

  return onPrimaryActionClick
}
