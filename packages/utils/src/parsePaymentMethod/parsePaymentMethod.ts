import { PaymentMethod } from 'types'

const validatePaymentMethod = (object: unknown): object is PaymentMethod => {
  if (!object) {
    return false
  }

  if (typeof object !== 'object') {
    return false
  }

  const castedObject = object as Record<string, any>

  if (!castedObject['brand'] && typeof castedObject['brand'] !== 'string') {
    return false
  }

  if (!castedObject['expMonth'] && typeof castedObject['expMonth'] !== 'string') {
    return false
  }

  if (!castedObject['expYear'] && typeof castedObject['expYear'] !== 'string') {
    return false
  }

  if (!castedObject['last4'] && typeof castedObject['last4'] !== 'string') {
    return false
  }

  return true
}

export const parsePaymentMethod = (paymentMethod?: any): PaymentMethod => {
  if (!validatePaymentMethod(paymentMethod)) {
    throw new Error('Invalid payment method')
  }

  const { brand, expMonth, expYear, last4 } = paymentMethod

  return {
    brand,
    expMonth,
    expYear,
    last4,
  }
}
