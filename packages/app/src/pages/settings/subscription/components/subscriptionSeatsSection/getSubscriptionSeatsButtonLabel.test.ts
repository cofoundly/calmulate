import { makePrice } from 'utils'
import { describe, expect, it } from 'vitest'

import { getSubscriptionSeatsButtonLabel } from './getSubscriptionSeatsButtonLabel'

describe('getSubscriptionSeatsButtonLabel', () => {
  it('returns "Update plan" when numberOfNewSeats is 0', () => {
    expect(getSubscriptionSeatsButtonLabel(0, makePrice({}))).toBe('Update plan')
  })

  it('returns "Add 1 seat for an additional $10 per month" when numberOfNewSeats is 1', () => {
    expect(getSubscriptionSeatsButtonLabel(1, makePrice({ unitAmount: 1000 }))).toBe(
      'Add 1 seat for an additional $10 per month',
    )
  })

  it('returns "Add 2 seats for an additional $20 per month" when numberOfNewSeats is 2', () => {
    expect(getSubscriptionSeatsButtonLabel(2, makePrice({ unitAmount: 1000 }))).toBe(
      'Add 2 seats for an additional $20 per month',
    )
  })

  it('returns "Remove 1 seat for $10 per month less" when numberOfNewSeats is -1', () => {
    expect(getSubscriptionSeatsButtonLabel(-1, makePrice({ unitAmount: 1000 }))).toBe(
      'Remove 1 seat for $10 per month less',
    )
  })

  it('returns "Remove 2 seats for $20 per month less" when numberOfNewSeats is -2', () => {
    expect(getSubscriptionSeatsButtonLabel(-2, makePrice({ unitAmount: 1000 }))).toBe(
      'Remove 2 seats for $20 per month less',
    )
  })
})
