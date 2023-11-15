import { describe, expect, it } from 'vitest'

import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats a date', () => {
    expect(formatDate('2021-01-01')).toBe('01 January 2021')
  })
})
