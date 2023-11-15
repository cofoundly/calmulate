import { SubscriptionStatus } from 'types'
import { describe, expect, it } from 'vitest'

import { formatSubscriptionStatus } from './formatSubscriptionStatus'

describe('formatSubscriptionStatus', () => {
  it('formats the subscription status', () => {
    expect(formatSubscriptionStatus(SubscriptionStatus.Trialing)).toBe('Trial')
    expect(formatSubscriptionStatus(SubscriptionStatus.Active)).toBe('Active')
    expect(formatSubscriptionStatus(SubscriptionStatus.PastDue)).toBe('Past due')
    expect(formatSubscriptionStatus(SubscriptionStatus.Cancelled)).toBe('Cancelled')
    expect(formatSubscriptionStatus(SubscriptionStatus.Unpaid)).toBe('Unpaid')
  })
})
