import { render, screen, waitFor } from '@testing-library/react'
import { Loading } from 'components'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { routes } from '@/router/routes'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'
import { UserManagementParams } from '@/types'

import { ResetPassword } from './ResetPassword'

const mocks = vi.hoisted(() => {
  return {
    navigate: vi.fn(),
    searchParams: vi.fn(
      () =>
        [
          {
            get: (param: UserManagementParams) => param,
          },
        ] as any,
    ),
    resetPassword: vi.fn(),
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

vi.mock('@/auth/hooks/useResetPassword', () => ({
  useResetPassword: () => ({
    mutate: mocks.resetPassword,
  }),
}))

describe('ResetPassword', () => {
  cleanUpAfterEach()

  it('renders and calls resetPassword with the actionCode and newPassword', async () => {
    render(
      <MockAppProvider>
        <ResetPassword />
      </MockAppProvider>,
    )

    expect(screen.getByTestId(Loading.TestId)).toBeInTheDocument()

    await waitFor(() =>
      expect(mocks.resetPassword).toHaveBeenCalledWith({
        // our mock function simply returns the param that was passed in
        actionCode: UserManagementParams.ActionCode,
        newPassword: UserManagementParams.NewPassword,
      }),
    )

    expect(mocks.navigate).toHaveBeenCalledWith(routes.signIn, { replace: true })
  })
})
