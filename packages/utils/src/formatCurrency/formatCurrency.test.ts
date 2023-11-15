import { describe, expect, it } from 'vitest'

import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats a price in USD', () => {
    expect(formatCurrency(100, 'USD')).toBe('$100')
  })

  it('formats a price in EUR', () => {
    expect(formatCurrency(100, 'EUR')).toBe('€100')
  })
})
