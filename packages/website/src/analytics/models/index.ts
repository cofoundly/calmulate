export enum AnalyticsEvent {
  PrimaryActionClicked = 'primaryActionClicked',
}

export enum AnalyticsPrimaryButtonName {
  Header = 'header',
  Hero = 'hero',
  Features = 'features',
  Pricing = 'pricing',
}

export type AnalyticsEventData = {
  [AnalyticsEvent.PrimaryActionClicked]: {
    buttonName: AnalyticsPrimaryButtonName
  }
}
