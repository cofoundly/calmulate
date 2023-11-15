import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'

const updateSubscriptionQuantityFunction = invokeFunction(Functions.updateSubscriptionQuantity)

export const updateSubscriptionQuantity = async (quantity: number) => {
  const response = await updateSubscriptionQuantityFunction({ quantity })

  return response
}
