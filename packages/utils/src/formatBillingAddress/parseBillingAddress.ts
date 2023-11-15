import { BillingAddress } from 'types'

const validateBillingAddress = (object: unknown): object is BillingAddress => {
  if (!object) {
    return false
  }

  if (typeof object !== 'object') {
    return false
  }

  const castedObject = object as Record<string, any>

  if (!castedObject['city'] && typeof castedObject['city'] !== 'string') {
    return false
  }

  if (!castedObject['line1'] && typeof castedObject['line1'] !== 'string') {
    return false
  }

  if (!castedObject['state'] && typeof castedObject['state'] !== 'string') {
    return false
  }

  if (!castedObject['country'] && typeof castedObject['country'] !== 'string') {
    return false
  }

  if (!castedObject['postalCode'] && typeof castedObject['postalCode'] !== 'string') {
    return false
  }

  return true
}

export const parseBillingAddress = (billingAddress?: any): BillingAddress => {
  if (!validateBillingAddress(billingAddress)) {
    throw new Error('Invalid billing address')
  }

  return billingAddress
}
