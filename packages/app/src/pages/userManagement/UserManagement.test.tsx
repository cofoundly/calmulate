import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { routes } from '@/router/routes'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'

import { UserManagement } from '.'

enum TestIds {
  ResetPassword = 'resetPassword',
  VerifyAndChangeEmail = 'verifyAndChangeEmail',
  VerifyEmail = 'verifyEmail',
}

// mock the components so that we can test the page without having to mock the entire firebase
vi.mock(
  './components/resetPassword/ResetPassword',
  vi.fn(() => ({
    ResetPassword: () => <div data-testid={TestIds.ResetPassword} />,
  })),
)

vi.mock(
  './components/verifyAndChangeEmail/VerifyAndChangeEmail',
  vi.fn(() => ({
    VerifyAndChangeEmail: () => <div data-testid={TestIds.VerifyAndChangeEmail} />,
  })),
)

vi.mock(
  './components/verifyEmail/VerifyEmail',
  vi.fn(() => ({
    VerifyEmail: () => <div data-testid={TestIds.VerifyEmail} />,
  })),
)

const mocks = vi.hoisted(() => {
  return {
    navigate: vi.fn(),
    searchParams: vi.fn(
      () =>
        [
          {
            get: () => '',
          },
        ] as any,
    ),
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

describe('UserManagement', () => {
  cleanUpAfterEach()

  it('navigates to sign in if no mode is present in the query params', () => {
    render(
      <MockAppProvider>
        <UserManagement />
      </MockAppProvider>,
    )

    expect(mocks.navigate).toHaveBeenCalledWith(routes.signIn)
  })

  it('renders ResetPassword if the resetPassword mode is present in the query params', () => {
    mocks.searchParams.mockReturnValue([
      {
        get: () => 'resetPassword',
      },
    ] as any)

    render(
      <MockAppProvider>
        <UserManagement />
      </MockAppProvider>,
    )

    expect(mocks.navigate).not.toHaveBeenCalledWith(routes.signIn)
    expect(screen.queryByTestId(TestIds.ResetPassword)).toBeInTheDocument()
  })

  it('renders VerifyAndChangeEmail if the verifyAndChangeEmail mode is present in the query params', () => {
    mocks.searchParams.mockReturnValue([
      {
        get: () => 'verifyAndChangeEmail',
      },
    ] as any)

    render(
      <MockAppProvider>
        <UserManagement />
      </MockAppProvider>,
    )

    expect(mocks.navigate).not.toHaveBeenCalledWith(routes.signIn)
    expect(screen.queryByTestId(TestIds.VerifyAndChangeEmail)).toBeInTheDocument()
  })

  it('renders VerifyEmail if the verifyEmail mode is present in the query params', async () => {
    mocks.searchParams.mockReturnValue([
      {
        get: () => 'verifyEmail',
      },
    ] as any)

    render(
      <MockAppProvider>
        <UserManagement />
      </MockAppProvider>,
    )

    expect(mocks.navigate).not.toHaveBeenCalledWith(routes.signIn)
    expect(screen.queryByTestId(TestIds.VerifyEmail)).toBeInTheDocument()
  })
})
