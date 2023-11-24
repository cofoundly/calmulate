import { fireEvent, render, screen } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '../../test/cleanUpAfterEach'
import { Navbar } from './Navbar'

type NavigationItem = ComponentProps<typeof Navbar>['items'][0]

const ITEMS: NavigationItem[] = [
  {
    name: 'Home',
    active: true,
  },
  {
    name: 'Dashboard',
    active: false,
    disabled: true,
  },
  {
    name: 'Settings',
    active: false,
  },
]

const onClick = vi.fn()

describe('Navbar', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(<Navbar items={ITEMS} onClick={onClick} />)

    expect(screen.getByRole('button', { name: ITEMS[0].name })).toBeInTheDocument()
  })

  it('disables the button if the item is disabled', () => {
    render(<Navbar items={ITEMS} onClick={onClick} />)

    expect(screen.getByRole('button', { name: ITEMS[1].name })).toBeDisabled()
  })

  it('allows click if the item is not disabled and the route is not active', () => {
    render(<Navbar items={ITEMS} onClick={onClick} />)

    const button = screen.getByRole('button', { name: ITEMS[2].name })
    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledWith(ITEMS[2])
  })
})
