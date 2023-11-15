export enum AnalyticsEvent {
  PrimaryActionClicked = 'primaryActionClicked',
}

export enum AnalyticsPrimaryButtonName {
  Header = 'header',
  Hero = 'hero',
  Cta = 'cta',
}

export type AnalyticsEventData = {
  [AnalyticsEvent.PrimaryActionClicked]: {
    buttonName: AnalyticsPrimaryButtonName
  }
}
