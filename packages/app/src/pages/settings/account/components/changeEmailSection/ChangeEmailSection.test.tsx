import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'
import { useUser } from '@/user/hooks/useUser'
import { makeUser } from '@/user/mocks/makeUser'

import { ChangeEmailSection } from './ChangeEmailSection'

const getEmailInput = () => screen.getByLabelText('New email address')
const getSubmitButton = () => screen.getByRole('button', { name: 'Save' })

const fillForm = ({ email }: { email?: string }) => {
  fireEvent.change(getEmailInput(), { target: { value: email } })
}

const mocks = vi.hoisted(() => {
  return {
    sendChangeEmailVerification: vi.fn(),
  }
})

const OLD_EMAIL = 'frank.gallagher@gmail.com'

vi.mock('@/user/hooks/useUser', () => ({
  useUser: vi.fn<any, Partial<ReturnType<typeof useUser>>>(() => ({
    data: makeUser({ email: OLD_EMAIL }),
  })),
}))

vi.mock('@/auth/hooks/useSendChangeEmailVerification', () => ({
  useSendChangeEmailVerification: () => ({
    mutate: mocks.sendChangeEmailVerification,
  }),
}))

describe('ChangeEmailSection', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <ChangeEmailSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Change email')).toBeInTheDocument()
    expect(getEmailInput()).toBeInTheDocument()
    expect(getSubmitButton()).toBeInTheDocument()
  })

  it('disables the form when there is no email', () => {
    render(
      <MockAppProvider>
        <ChangeEmailSection />
      </MockAppProvider>,
    )

    fillForm({
      email: '',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when the email has not changed', () => {
    render(
      <MockAppProvider>
        <ChangeEmailSection />
      </MockAppProvider>,
    )

    fillForm({
      email: OLD_EMAIL,
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there the email is invalid', () => {
    render(
      <MockAppProvider>
        <ChangeEmailSection />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher@gmail',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('enabled the form when are valid input values', () => {
    render(
      <MockAppProvider>
        <ChangeEmailSection />
      </MockAppProvider>,
    )

    fillForm({
      email: 'frank.gallagher+news@gmail.com',
    })

    expect(getSubmitButton()).toBeEnabled()
  })

  it('changes users emails', () => {
    render(
      <MockAppProvider>
        <ChangeEmailSection />
      </MockAppProvider>,
    )

    const newEmail = 'frank.gallagher+news@gmail.com'
    fillForm({
      email: newEmail,
    })

    fireEvent.click(getSubmitButton())

    expect(mocks.sendChangeEmailVerification).toHaveBeenCalledWith({
      newEmail,
      oldEmail: OLD_EMAIL,
    })
  })
})
