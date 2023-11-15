import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '../../test/cleanUpAfterEach'
import { Popover } from './Popover'

const onClose = vi.fn()

const getCloseButton = () => screen.getByRole('button', { name: 'Close' })

describe('Popover', () => {
  cleanUpAfterEach()

  it('renders', async () => {
    render(<Popover open onClose={onClose} />)

    expect(getCloseButton()).toBeInTheDocument()
  })

  it('closes the Popover', () => {
    render(<Popover open onClose={onClose} />)

    fireEvent.click(getCloseButton())

    expect(onClose).toHaveBeenCalled()
  })
})
