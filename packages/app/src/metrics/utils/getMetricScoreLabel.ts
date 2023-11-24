export const getMetricScoreLabel = ({
  score,
  settingHigh,
  settingAverage,
}: {
  score: number
  settingHigh: number
  settingAverage: number
}) => {
  if (score === 0) {
    return 'Unknown'
  }

  if (score >= settingHigh) {
    return 'High'
  }

  if (score >= settingAverage) {
    return 'Moderate'
  }

  return 'Low'
}
