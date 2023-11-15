import { describe, expect, it } from 'vitest'

import { getUuid } from './getUuid'

describe('getUuid', () => {
  it('generates a UUID', () => {
    expect(getUuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  })
})
