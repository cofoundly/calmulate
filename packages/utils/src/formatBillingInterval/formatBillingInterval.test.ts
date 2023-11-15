import { describe, expect, it } from 'vitest'

import { formatBillingInterval } from './formatBillingInterval'

describe('formatBillingInterval', () => {
  it('formats the billing interval', () => {
    expect(formatBillingInterval('day')).toBe('Daily')
    expect(formatBillingInterval('week')).toBe('Weekly')
    expect(formatBillingInterval('month')).toBe('Monthly')
    expect(formatBillingInterval('year')).toBe('Yearly')
    expect(formatBillingInterval('')).toBe('')
  })
})
