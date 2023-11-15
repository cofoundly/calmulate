import { render, screen, waitFor } from '@testing-library/react'
import { Loading } from 'components'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { routes } from '@/router/routes'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'
import { UserManagementParams } from '@/types'

import { VerifyAndChangeEmail } from './VerifyAndChangeEmail'

const mocks = vi.hoisted(() => {
  return {
    navigate: vi.fn(),
    searchParams: vi.fn(
      () =>
        [
          {
            get: (param: string) => param,
          },
        ] as any,
    ),
    verifyEmail: vi.fn(),
    changeUserEmail: vi.fn(),
  }
})

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
    useSearchParams: mocks.searchParams,
  }
})

vi.mock('@/auth/hooks/useVerifyEmail', () => ({
  useVerifyEmail: () => ({
    mutate: mocks.verifyEmail,
  }),
}))

vi.mock('@/auth/hooks/useChangeUserEmail', () => ({
  useChangeUserEmail: () => ({
    mutate: mocks.changeUserEmail,
  }),
}))

describe('VerifyAndChangeEmail', () => {
  cleanUpAfterEach()

  it('renders and calls verifyEmail with the actionCode and changeUserEmail with the old and new emails', async () => {
    render(
      <MockAppProvider>
        <VerifyAndChangeEmail />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(Loading.TestId)).toBeInTheDocument()

    // our mock function simply returns the param that was passed in
    await waitFor(() => expect(mocks.verifyEmail).toHaveBeenCalledWith(UserManagementParams.ActionCode))

    await waitFor(() =>
      expect(mocks.changeUserEmail).toHaveBeenCalledWith({
        oldEmail: UserManagementParams.OldEmail,
        newEmail: UserManagementParams.NewEmail,
      }),
    )

    expect(mocks.navigate).toHaveBeenCalledWith(routes.signIn, { replace: true })
  })
})
