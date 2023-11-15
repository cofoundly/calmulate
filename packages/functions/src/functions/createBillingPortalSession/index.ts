import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Functions, FunctionsMap } from 'types'

import { getAuthUser } from '@/auth/getAuthUser'
import { createBillingPortalSession } from '@/billing/createBillingPortalSession'
import { createCustomer } from '@/billing/createCustomer'
import { getCustomerByUid } from '@/billing/getCustomerByUid'

export const createBillingPortalSessionFunction = onCall<
  FunctionsMap[Functions.createBillingPortalSession]['data'],
  Promise<FunctionsMap[Functions.createBillingPortalSession]['response']>
>(async request => {
  try {
    // Authorized api requests only
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Unauthorized')
    }

    // Get the user from the request
    const user = await getAuthUser(request.auth.uid)

    if (!user) {
      throw new HttpsError('not-found', 'User not found')
    }

    // Get or create the customer in Stripe
    const customer = await getCustomerByUid(user.uid)
    let customerId = customer?.id

    if (!customerId) {
      customerId = await createCustomer({
        uid: user.uid,
        email: user.email || '',
      })
    }

    const { returnUrl } = request.data

    // Create a billing potral session in Stripe
    const session = await createBillingPortalSession({ customerId, returnUrl })

    if (session) {
      return {
        url: session.url,
      }
    } else {
      throw new HttpsError('internal', 'Unable to create billing portal session')
    }
  } catch (error) {
    console.error(error)

    throw new HttpsError('internal', (error as Error).message)
  }
})
