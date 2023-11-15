import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { DeleteAccountSection } from './DeleteAccountSection'

const getDeleteMyAccountButton = () => screen.getByRole('button', { name: 'Yes, delete my account' })
const queryConfirmButton = () => screen.queryByRole('button', { name: 'Confirm' })
const getConfirmButton = () => screen.getByRole('button', { name: 'Confirm' })

const mocks = vi.hoisted(() => {
  return {
    deleteUserAccount: vi.fn(),
    useHasActiveSubscription: vi.fn(() => ({
      data: false,
    })),
  }
})

vi.mock('@/billing/hooks/useHasActiveSubscription', () => ({
  useHasActiveSubscription: mocks.useHasActiveSubscription,
}))

vi.mock('@/auth/hooks/useDeleteUserAccount', () => ({
  useDeleteUserAccount: () => ({
    mutate: mocks.deleteUserAccount,
  }),
}))

describe('DeleteAccountSection', () => {
  cleanUpAfterEach()

  it('renders', () => {
    render(
      <MockAppProvider>
        <DeleteAccountSection />
      </MockAppProvider>,
    )

    expect(screen.getByText('Delete account')).toBeInTheDocument()
    expect(getDeleteMyAccountButton()).toBeInTheDocument()
    expect(queryConfirmButton()).not.toBeInTheDocument()
  })

  it('is disabled if a user has an active subscription', () => {
    mocks.useHasActiveSubscription.mockImplementationOnce(() => ({
      data: true,
    }))

    render(
      <MockAppProvider>
        <DeleteAccountSection />
      </MockAppProvider>,
    )

    expect(
      screen.getByText(
        'You cannot delete your account while you have an active subscription. Please cancel your subscription first.',
      ),
    ).toBeInTheDocument()
    expect(getDeleteMyAccountButton()).toBeDisabled()
  })

  it('is enabled if a user does not have an active subscription', () => {
    render(
      <MockAppProvider>
        <DeleteAccountSection />
      </MockAppProvider>,
    )

    expect(
      screen.getByText(
        'No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.',
      ),
    ).toBeInTheDocument()
    expect(getDeleteMyAccountButton()).toBeEnabled()
  })

  it('shows the confirmation dialog on click and deletes a users account', async () => {
    render(
      <MockAppProvider>
        <DeleteAccountSection />
      </MockAppProvider>,
    )

    fireEvent.click(getDeleteMyAccountButton())

    await waitFor(() => expect(getConfirmButton()).toBeInTheDocument())

    fireEvent.click(getConfirmButton())

    expect(mocks.deleteUserAccount).toHaveBeenCalled()

    // the dialog should close
    await waitFor(() => expect(queryConfirmButton()).not.toBeInTheDocument())
  })
})
