import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'

const createBillingPortalSessionFunction = invokeFunction(Functions.createBillingPortalSession)

export const createBillingPortalSession = async () => {
  const response = await createBillingPortalSessionFunction({ returnUrl: window.location.href })

  return response
}
