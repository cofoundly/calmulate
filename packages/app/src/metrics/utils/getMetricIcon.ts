import { ClockIcon, HeartIcon, ScaleIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'

import { Metric } from '../models'

export const getMetricIcon = (metric: Metric | null) => {
  switch (metric) {
    case 'stress':
      return HeartIcon
    case 'productivity':
      return ClockIcon
    case 'balance':
      return ScaleIcon

    default:
      return QuestionMarkCircleIcon
  }
}
