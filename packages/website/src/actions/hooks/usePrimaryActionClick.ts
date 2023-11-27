import { useCallback } from 'react'
import { useLink } from 'utils'

import { useTrackAnalyticsEvent } from '@/analytics/hooks/useTrackAnalyticsEvent'
import { AnalyticsEvent, AnalyticsPrimaryButtonName } from '@/analytics/models'

export const usePrimaryActionClick = () => {
  const trackAnalyticsEvent = useTrackAnalyticsEvent()
  const link = useLink()

  const onPrimaryActionClick = useCallback(
    ({ buttonName }: { buttonName: AnalyticsPrimaryButtonName }) => {
      trackAnalyticsEvent(AnalyticsEvent.PrimaryActionClicked, {
        buttonName,
      })

      link('https://getwaitlist.com/waitlist/12110')
    },
    [link, trackAnalyticsEvent],
  )

  return onPrimaryActionClick
}
