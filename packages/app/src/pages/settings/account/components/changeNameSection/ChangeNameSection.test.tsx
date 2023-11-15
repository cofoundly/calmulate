import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'
import { useUser } from '@/user/hooks/useUser'
import { makeUser } from '@/user/mocks/makeUser'

import { ChangeNameSection } from './ChangeNameSection'

const getFirstNameInput = () => screen.getByLabelText('First name')
const getLastNameInput = () => screen.getByLabelText('Last name')
const getSubmitButton = () => screen.getByRole('button', { name: 'Save' })

const fillForm = ({ firstName, lastName }: { firstName?: string; lastName?: string }) => {
  fireEvent.change(getFirstNameInput(), { target: { value: firstName } })
  fireEvent.change(getLastNameInput(), { target: { value: lastName } })
}

const mocks = vi.hoisted(() => {
  return {
    updateUser: vi.fn(),
  }
})

const UID = '12345678'
const OLD_FIRST_NAME = 'Frank'
const OLD_LAST_NAME = 'Gallagher'

vi.mock('@/user/hooks/useUser', () => ({
  useUser: vi.fn<any, Partial<ReturnType<typeof useUser>>>(() => ({
    data: makeUser({
      id: UID,
      firstName: OLD_FIRST_NAME,
      lastName: OLD_LAST_NAME,
    }),
  })),
}))

vi.mock('@/user/hooks/useUpdateUser', () => ({
  useUpdateUser: () => ({
    mutate: mocks.updateUser,
  }),
}))

describe('ChangeNameSection', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <ChangeNameSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Change name')).toBeInTheDocument()
    expect(getFirstNameInput()).toBeInTheDocument()
    expect(getLastNameInput()).toBeInTheDocument()
    expect(getSubmitButton()).toBeInTheDocument()
  })

  it('disables the form when there is no firstName', () => {
    render(
      <MockAppProvider>
        <ChangeNameSection />
      </MockAppProvider>,
    )

    fillForm({
      firstName: '',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when there is no lastName', () => {
    render(
      <MockAppProvider>
        <ChangeNameSection />
      </MockAppProvider>,
    )

    fillForm({
      lastName: '',
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('disables the form when the firstName or lastName has not changed', () => {
    render(
      <MockAppProvider>
        <ChangeNameSection />
      </MockAppProvider>,
    )

    fillForm({
      firstName: OLD_FIRST_NAME,
      lastName: OLD_LAST_NAME,
    })

    expect(getSubmitButton()).toBeDisabled()
  })

  it('enabled the form when are valid input values', () => {
    render(
      <MockAppProvider>
        <ChangeNameSection />
      </MockAppProvider>,
    )

    fillForm({
      firstName: 'Franky',
      lastName: 'Gallos',
    })

    expect(getSubmitButton()).toBeEnabled()
  })

  it('changes users names', () => {
    render(
      <MockAppProvider>
        <ChangeNameSection />
      </MockAppProvider>,
    )

    const newFirstName = 'Franky'
    const newLastName = 'Gallos'
    fillForm({
      firstName: newFirstName,
      lastName: newLastName,
    })

    fireEvent.click(getSubmitButton())

    expect(mocks.updateUser).toHaveBeenCalledWith({
      id: UID,
      firstName: newFirstName,
      lastName: newLastName,
    })
  })
})
