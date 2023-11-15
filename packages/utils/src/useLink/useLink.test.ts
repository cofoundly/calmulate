import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useLink } from './useLink'

describe('useLink', () => {
  it('opens a link', () => {
    const { result } = renderHook(useLink)

    const windowOpen = vi.spyOn(window, 'open')

    result.current('https://example.com')

    expect(windowOpen).toHaveBeenCalledWith('https://example.com', undefined)
  })

  it('opens a link in a new tab', () => {
    const { result } = renderHook(useLink)

    const windowOpen = vi.spyOn(window, 'open')

    result.current('https://example.com', '_blank')

    expect(windowOpen).toHaveBeenCalledWith('https://example.com', '_blank')
  })
})
