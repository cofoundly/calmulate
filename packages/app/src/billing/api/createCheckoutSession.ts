import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'

const createCheckoutSessionFunction = invokeFunction(Functions.createCheckoutSession)

export const createCheckoutSession = async ({ priceId, quantity }: { priceId: string; quantity: number }) => {
  const response = await createCheckoutSessionFunction({
    priceId,
    quantity,
    successUrl: `${window.location.href}?success=true`,
    cancelUrl: window.location.href,
  })

  return response
}
