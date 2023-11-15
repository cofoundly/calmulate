import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

export const cleanUpAfterEach = () => {
  afterEach(() => {
    // unmount any rendered components
    cleanup()

    // clear all mocks
    vi.clearAllMocks()
  })
}
