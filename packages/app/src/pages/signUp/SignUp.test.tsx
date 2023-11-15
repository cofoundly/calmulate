import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { app } from '../../../../config'
import { SignUp } from '.'

const mocks = vi.hoisted(() => {
  return {
    signUpWithPassword: vi.fn(),
  }
})

vi.mock('@/auth/hooks/useSignUpWithPassword', () => ({
  useSignUpWithPassword: () => ({
    mutate: mocks.signUpWithPassword,
  }),
}))

const getFirstNameInput = () => screen.getByLabelText('First name')
const getLastNameInput = () => screen.getByLabelText('Last name')
const getEmailInput = () => screen.getByLabelText('Email address')
const getPasswordInput = () => screen.getByLabelText('Password')
const getSubmitButton = () => screen.getByRole('button', { name: 'Sign up' })

const fillForm = ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}) => {
  fireEvent.change(getFirstNameInput(), { target: { value: firstName } })
  fireEvent.change(getLastNameInput(), { target: { value: lastName } })
  fireEvent.change(getEmailInput(), { target: { value: email } })
  fireEvent.change(getPasswordInput(), { target: { value: password } })
}

describe('SignUp', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <SignUp />
      </MockAppProvider>,
    )

    expect(screen.getByText(`Sign up to ${app.name}`)).toBeInTheDocument()
    expect(getFirstNameInput()).toBeInTheDocument()
    expect(getLastNameInput()).toBeInTheDocument()
    expect(getEmailInput()).toBeInTheDocument()
    expect(getPasswordInput()).toBeInTheDocument()
    expect(getSubmitButton()).toBeInTheDocument()
  })

  it('disables the form when are no input values', () => {
    render(
      <MockAppProvider>
        <SignUp />
      </MockAppProvider>,
    )

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there is no firstName', () => {
    render(
      <MockAppProvider>
        <SignUp />
      </MockAppProvider>,
    )

    fillForm({
      firstName: '',
      lastName: 'Gallagher',
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there is no lastName', () => {
    render(
      <MockAppProvider>
        <SignUp />
      </MockAppProvider>,
    )

    fillForm({
      firstName: 'Frank',
      lastName: '',
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there is no email', () => {
    render(
      <MockAppProvider>
        <SignUp />
      </MockAppProvider>,
    )

    fillForm({
      firstName: 'Frank',
      lastName: 'Gallagher',
      email: '',
      password: '123123',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there the email is invalid', () => {
    render(
      <MockAppProvider>
        <SignUp />
      </MockAppProvider>,
    )

    fillForm({
      firstName: 'Frank',
      lastName: 'Gallagher',
      email: 'frank.gallagher@gmail',
      password: '123123',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there is no password', () => {
    render(
      <MockAppProvider>
        <SignUp />
      </MockAppProvider>,
    )

    fillForm({
      firstName: 'Frank',
      lastName: 'Gallagher',
      email: 'frank.gallagher@gmail.com',
      password: '',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('enabled the form when are valid input values', () => {
    render(
      <MockAppProvider>
        <SignUp />
      </MockAppProvider>,
    )

    fillForm({
      firstName: 'Frank',
      lastName: 'Gallagher',
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    expect(getSubmitButton()).toBeEnabled()
  })

  it('signs up users', () => {
    render(
      <MockAppProvider>
        <SignUp />
      </MockAppProvider>,
    )

    fillForm({
      firstName: 'Frank',
      lastName: 'Gallagher',
      email: 'frank.gallagher@gmail.com',
      password: '123123',
    })

    fireEvent.submit(getSubmitButton())

    expect(mocks.signUpWithPassword).toHaveBeenCalled()
  })
})
