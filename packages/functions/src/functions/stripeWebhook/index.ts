import { onRequest } from 'firebase-functions/v2/https'

import { deleteProduct } from '@/billing/deleteProduct'
import { manageSubscriptionStatusChange } from '@/billing/manageSubscriptionStatusChange'
import { Stripe, stripe } from '@/billing/stripe'
import { updatePrice } from '@/billing/updatePrice'
import { updateProduct } from '@/billing/updateProduct'

// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createNodeCryptoProvider()

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'product.deleted',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export const stripeWebhookFunction = onRequest(async (request, response) => {
  const signature = String(request.headers['stripe-signature'])

  if (!signature) {
    response.status(400).send('Missing signature header')

    return
  }

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = request.rawBody

  if (!body) {
    response.status(400).send('Missing body')

    return
  }

  let stripeEvent: Stripe.Event

  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      import.meta.env.VITE_STRIPE_WEBHOOK_SIGNING_SECRET || '',
      undefined,
      cryptoProvider,
    )
  } catch (error) {
    console.error(error)

    response.status(400).send((error as Error).message)

    return
  }

  // We use this event to query the Stripe API in order to avoid
  // handling any forged event. If available, we use the idempotency key.
  const idempotencyKey = String(request.headers['Idempotency-Key'] || '')
  const requestOptions = idempotencyKey
    ? {
        idempotencyKey: idempotencyKey,
      }
    : {}

  let retrievedEvent: Stripe.Event

  try {
    retrievedEvent = await stripe.events.retrieve(stripeEvent.id, requestOptions)
  } catch (error) {
    console.error(error)

    response.status(400).send((error as Error).message)

    return
  }

  if (relevantEvents.has(retrievedEvent.type)) {
    try {
      switch (retrievedEvent.type) {
        case 'product.created':
        case 'product.updated':
          await updateProduct(retrievedEvent.data.object as Stripe.Product)
          break
        case 'product.deleted':
          await deleteProduct((retrievedEvent.data.object as Stripe.Product).id)
          break
        case 'price.created':
        case 'price.updated':
          await updatePrice(retrievedEvent.data.object as Stripe.Price)
          break
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = retrievedEvent.data.object as Stripe.Subscription

          await manageSubscriptionStatusChange({
            subscriptionId: subscription.id,
            customerId: subscription.customer as string,
            isNewSubscription: retrievedEvent.type === 'customer.subscription.created',
          })

          break
        case 'checkout.session.completed':
          const checkoutSession = retrievedEvent.data.object as any

          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription

            await manageSubscriptionStatusChange({
              subscriptionId,
              customerId: checkoutSession.customer,
              isNewSubscription: true,
            })
          }

          break
        default:
          console.error('Unhandled relevant event!', retrievedEvent.type)

          throw new Error('Unhandled relevant event!')
      }
    } catch (error) {
      console.error(retrievedEvent.type, error)

      response.status(500).send((error as Error).message)

      return
    }
  }

  response.status(200).send('ok')
})
