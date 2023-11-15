import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useKeyPress } from './useKeyPress'

describe('useKeyPress', () => {
  it('calls the callback when the key is pressed', () => {
    const callback = vi.fn()

    renderHook(() => useKeyPress('a', callback))

    const event = new KeyboardEvent('keyup', { key: 'a' })

    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  it('does not call the callback when another key is pressed', () => {
    const callback = vi.fn()

    renderHook(() => useKeyPress('a', callback))

    const event = new KeyboardEvent('keyup', { key: 'b' })

    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })
})
