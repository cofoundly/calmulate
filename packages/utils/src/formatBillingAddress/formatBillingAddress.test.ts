import { describe, expect, it } from 'vitest'

import { formatBillingAddress } from './formatBillingAddress'

describe('formatBillingAddress', () => {
  it('formats a billing address', () => {
    const billingAddress = {
      city: 'San Francisco',
      line1: '123 Main St',
      line2: 'Apt 1',
      state: 'CA',
      country: 'US',
      postalCode: '94103',
    }

    expect(formatBillingAddress(billingAddress)).toEqual('123 Main St, Apt 1, San Francisco, CA, 94103, US')
  })
})
