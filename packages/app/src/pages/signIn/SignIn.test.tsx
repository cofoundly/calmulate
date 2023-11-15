import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { SignIn } from '.'

const mocks = vi.hoisted(() => {
  return {
    signInWithPassword: vi.fn(),
  }
})

vi.mock('@/auth/hooks/useSignInWithPassword', () => ({
  useSignInWithPassword: () => ({
    mutate: mocks.signInWithPassword,
  }),
}))

const getEmailInput = () => screen.getByLabelText('Email address')
const getPasswordInput = () => screen.getByLabelText('Password')
const getSubmitButton = () => screen.getByRole('button', { name: 'Sign in' })

const fillForm = ({ email, password }: { email?: string; password?: string }) => {
  fireEvent.change(getEmailInput(), { target: { value: email } })
  fireEvent.change(getPasswordInput(), { target: { value: password } })
}

describe('SignIn', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
    expect(getEmailInput()).toBeInTheDocument()
    expect(getPasswordInput()).toBeInTheDocument()
    expect(getSubmitButton()).toBeInTheDocument()
  })

  it('disables the form when are no input values', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there is no email', () => {
    render(
      <MockAppProvider>
        <SignIn />
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
        <SignIn />
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
        <SignIn />
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
        <SignIn />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    expect(getSubmitButton()).toBeEnabled()
  })

  it('signs in users', () => {
    render(
      <MockAppProvider>
        <SignIn />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    fireEvent.submit(getSubmitButton())

    expect(mocks.signInWithPassword).toHaveBeenCalled()
  })
})
