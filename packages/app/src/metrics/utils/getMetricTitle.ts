import { Metric } from '../models'

export const getMetricTitle = (metric: Metric | null) => {
  switch (metric) {
    case 'stress':
      return 'Stress'
    case 'productivity':
      return 'Productivity'
    case 'balance':
      return 'Balance'

    default:
      return ''
  }
}
