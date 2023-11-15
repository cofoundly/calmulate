export enum AnalyticsEvent {
  ArbEvent = 'arbEvent',
}

export type AnalyticsEventData = {
  [AnalyticsEvent.ArbEvent]: {
    foo: string
  }
}
