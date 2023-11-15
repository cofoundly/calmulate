import { describe, expect, it } from 'vitest'

import { maybePluralise } from './maybePluralise'

describe('maybePluralise', () => {
  it('pluralises a word', () => {
    expect(maybePluralise(2, 'item')).toBe('items')
  })

  it('does not pluralise a word', () => {
    expect(maybePluralise(1, 'item')).toBe('item')
  })
})
