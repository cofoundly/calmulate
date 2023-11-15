import { describe, expect, it } from 'vitest'

import { validateEmail } from './validateEmail'

describe('validateEmail', () => {
  it('validates an email address', () => {
    expect(validateEmail('')).toBe(false)
    expect(validateEmail('test')).toBe(false)
    expect(validateEmail('test@')).toBe(false)
    expect(validateEmail('test@example')).toBe(false)
    expect(validateEmail('test@example.com')).toBe(true)
  })
})
