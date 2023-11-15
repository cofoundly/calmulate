import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { routes } from '@/router/routes'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { ForgotPassword } from '.'

const getNavigateToSignInButton = () => screen.getByRole('button', { name: 'Back to sign in' })

vi.mock(
  '@/components/resetPassword/ResetPassword',
  vi.fn(() => ({
    ResetPassword: vi.fn(),
  })),
)

const mocks = vi.hoisted(() => {
  return {
    navigate: vi.fn(),
  }
})

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

describe('ForgotPassword', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <ForgotPassword />
      </MockAppProvider>,
    )

    expect(screen.getByText('Forgot your password?')).toBeInTheDocument()
    expect(getNavigateToSignInButton()).toBeInTheDocument()
  })

  it('navigates back to sign in', () => {
    render(
      <MockAppProvider>
        <ForgotPassword />
      </MockAppProvider>,
    )

    fireEvent.click(getNavigateToSignInButton())

    expect(mocks.navigate).toHaveBeenCalledWith(routes.signIn)
  })
})
