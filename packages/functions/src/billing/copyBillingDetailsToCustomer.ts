import { updateUser } from '@/users/updateUser'

import { Stripe, stripe } from './stripe'

/**
 * Copies the billing details from the payment method to the customer object.
 */
export const copyBillingDetailsToCustomer = async (paymentMethod: Stripe.PaymentMethod, uid: string | null) => {
  const customer = paymentMethod.customer as string
  const { name, phone, address } = paymentMethod.billing_details

  const customerData: Stripe.CustomerUpdateParams = {}

  if (name) {
    customerData.name = name
  }

  if (phone) {
    customerData.phone = phone
  }

  if (address) {
    customerData.address = {
      city: address.city || '',
      country: address.country || '',
      line1: address.line1 || '',
      line2: address.line2 || '',
      postal_code: address.postal_code || '',
      state: address.state || '',
    }
  }

  await stripe.customers.update(customer, customerData)

  // the uid is null for guest users from the website
  // their details will be updated once they create and verify their user account
  if (uid) {
    await updateUser(uid, {
      billingAddress: {
        city: address?.city || '',
        country: address?.country || '',
        line1: address?.line1 || '',
        line2: address?.line2 || '',
        postalCode: address?.postal_code || '',
        state: address?.state || '',
      },
      paymentMethod: {
        brand: paymentMethod.card?.brand || '',
        expMonth: paymentMethod.card?.exp_month || 0,
        expYear: paymentMethod.card?.exp_year || 0,
        last4: paymentMethod.card?.last4 || '',
      },
    })
  }
}
