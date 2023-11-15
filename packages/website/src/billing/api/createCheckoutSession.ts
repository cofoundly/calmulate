import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'

const createCheckoutSessionFunction = invokeFunction(Functions.createCheckoutSession)

export const createCheckoutSession = async ({ priceId, quantity }: { priceId: string; quantity: number }) => {
  const response = await createCheckoutSessionFunction({
    priceId,
    quantity,
    successUrl: `${process.env.NEXT_PUBLIC_APP_SIGN_UP_URL}?success=true`,
    cancelUrl: window.location.href,
  })

  return response
}
