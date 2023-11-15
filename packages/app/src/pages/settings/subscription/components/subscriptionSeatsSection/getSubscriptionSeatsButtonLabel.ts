import { Price } from 'types'
import { formatCurrency, maybePluralise } from 'utils'

export const getSubscriptionSeatsButtonLabel = (numberOfNewSeats: number, activePrice: Price): string => {
  if (numberOfNewSeats === 0) {
    return 'Update plan'
  }

  const seatsText = `${Math.abs(numberOfNewSeats)} ${maybePluralise(Math.abs(numberOfNewSeats), 'seat')}`
  const costText = formatCurrency((Math.abs(numberOfNewSeats) * activePrice.unitAmount) / 100, activePrice.currency)

  if (numberOfNewSeats > 0) {
    return `Add ${seatsText} for an additional ${costText} per ${activePrice.interval}`
  }

  return `Remove ${seatsText} for ${costText} per ${activePrice.interval} less`
}
