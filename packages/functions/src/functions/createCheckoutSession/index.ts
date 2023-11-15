import { UserRecord } from 'firebase-admin/auth'
import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Functions, FunctionsMap } from 'types'

import { getAuthUser } from '@/auth/getAuthUser'
import { createCheckoutSession } from '@/billing/createCheckoutSession'
import { createCustomer } from '@/billing/createCustomer'
import { getCustomerByUid } from '@/billing/getCustomerByUid'
import { getProductByPriceId } from '@/billing/getProductByPriceId'

export const createCheckoutSessionFunction = onCall<
  FunctionsMap[Functions.createCheckoutSession]['data'],
  Promise<FunctionsMap[Functions.createCheckoutSession]['response']>
>(async request => {
  try {
    let customerId: string | undefined
    let user: UserRecord | undefined

    // try and find a customer for the logged in user
    if (request.auth?.uid) {
      user = await getAuthUser(request.auth.uid)

      if (user) {
        const customer = await getCustomerByUid(user.uid)

        if (customer) {
          customerId = customer.id
        }
      }
    }

    // if a customer does not exist, create one
    if (!customerId) {
      customerId = await createCustomer({
        email: user?.email,
        uid: user?.uid || null,
      })
    }

    const { priceId, quantity, successUrl, cancelUrl, metadata = {} } = request.data

    // Get the product using the priceId and pass product.metadata.freeTrialDays to createCheckoutSession
    const product = await getProductByPriceId(priceId)
    const freeTrialDays = product.metadata?.freeTrialDays ? Number(product.metadata.freeTrialDays) : undefined

    // Create a checkout session in Stripe
    const session = await createCheckoutSession({
      customerId,
      priceId,
      quantity,
      freeTrialDays,
      metadata,
      successUrl,
      cancelUrl,
    })

    if (session?.url) {
      return {
        url: session.url,
      }
    } else {
      throw new HttpsError('internal', 'Unable to create checkout session')
    }
  } catch (error) {
    console.error(error)

    throw new HttpsError('internal', (error as Error).message)
  }
})
