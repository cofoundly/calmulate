import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { ResetPassword } from './ResetPassword'

const getEmailInput = () => screen.getByLabelText('Email address')
const getPasswordInput = () => screen.getByLabelText('New password')
const getSubmitButton = () => screen.getByRole('button', { name: 'Send password reset email' })

const fillForm = ({ email, password }: { email?: string; password?: string }) => {
  fireEvent.change(getEmailInput(), { target: { value: email } })
  fireEvent.change(getPasswordInput(), { target: { value: password } })
}

const mocks = vi.hoisted(() => ({
  requestResetPassword: vi.fn(),
}))

vi.mock('@/auth/hooks/useRequestResetPassword', () => ({
  useRequestResetPassword: () => ({
    mutate: mocks.requestResetPassword,
  }),
}))

describe('ResetPassword', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <ResetPassword />
      </MockAppProvider>,
    )

    expect(getEmailInput()).toBeInTheDocument()
    expect(getPasswordInput()).toBeInTheDocument()
    expect(getSubmitButton()).toBeInTheDocument()
  })

  it('disables the form when are no input values', () => {
    render(
      <MockAppProvider>
        <ResetPassword />
      </MockAppProvider>,
    )

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there is no email', () => {
    render(
      <MockAppProvider>
        <ResetPassword />
      </MockAppProvider>,
    )

    fillForm({
      email: '',
      password: '123123',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there the email is invalid', () => {
    render(
      <MockAppProvider>
        <ResetPassword />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail',
      password: '123123',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there is no password', () => {
    render(
      <MockAppProvider>
        <ResetPassword />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail.com',
      password: '',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('enabled the form when are valid input values', () => {
    render(
      <MockAppProvider>
        <ResetPassword />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    expect(getSubmitButton()).toBeEnabled()
  })

  it('sends reset password requests', () => {
    render(
      <MockAppProvider>
        <ResetPassword />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    fireEvent.submit(getSubmitButton())

    expect(mocks.requestResetPassword).toHaveBeenCalled()
  })
})
