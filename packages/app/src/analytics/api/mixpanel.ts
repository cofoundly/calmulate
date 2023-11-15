import mixpanel from 'mixpanel-browser'

import { AnalyticsEvent, AnalyticsEventData } from '../models'

export const ANALYTICS_ENABLED = import.meta.env.MODE !== 'development' && import.meta.env.VITE_MIXPANEL_TOKEN

if (ANALYTICS_ENABLED) {
  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN || '', {
    track_pageview: true,
    persistence: 'localStorage',
  })
}

export const identifyUser = (uid: string) => {
  if (ANALYTICS_ENABLED) {
    mixpanel.identify(uid)
  }
}

export const trackAnalyticsEvent = <T extends AnalyticsEvent>(event: T, data?: AnalyticsEventData[T]) => {
  if (ANALYTICS_ENABLED) {
    mixpanel.track(event, data)
  }
}

export { mixpanel }
