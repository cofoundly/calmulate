export const getMetricScoreColor = ({
  score,
  settingHigh,
  settingAverage,
  inverted = false,
}: {
  score: number
  settingHigh: number
  settingAverage: number
  inverted?: boolean
}) => {
  if (score === 0) {
    return 'gray'
  }

  if (score >= settingHigh) {
    return inverted ? 'red' : 'green'
  }

  if (score >= settingAverage) {
    return 'orange'
  }

  return inverted ? 'green' : 'red'
}
