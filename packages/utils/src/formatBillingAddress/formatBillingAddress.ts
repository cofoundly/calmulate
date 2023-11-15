import { parseBillingAddress } from './parseBillingAddress'

export const formatBillingAddress = (billingAddress?: any): string => {
  const { city, line1, line2, state, country, postalCode } = parseBillingAddress(billingAddress)

  return `${line1}${line2 ? `, ${line2}` : ''}, ${city}, ${state}, ${postalCode}, ${country}`
}
