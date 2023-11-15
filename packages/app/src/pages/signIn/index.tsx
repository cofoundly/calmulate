import { AnchorText, Button, SmallText, TextInput } from 'components'
import { FormEvent, useCallback, useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from 'utils'

import { useSignInWithPassword } from '@/auth/hooks/useSignInWithPassword'
import { AuthLayout } from '@/components/authLayout/AuthLayout'
import { routes } from '@/router/routes'
import { useUserEmail } from '@/user/hooks/useUserEmail'

export const SignIn = () => {
  const [email, setEmail] = useUserEmail()
  const [password, setPassword] = useState('')

  const { mutate: signInWithPassword, isLoading } = useSignInWithPassword()
  const navigate = useNavigate()

  const isEmailValid = validateEmail(email)
  const disabled = !email || !password || !isEmailValid

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (disabled) {
        return
      }

      await signInWithPassword({ email, password })
    },
    [disabled, email, password, signInWithPassword],
  )

  return (
    <AuthLayout title="Sign in to your account">
      <form className="space-y-6" onSubmit={onSubmit}>
        <TextInput
          type="email"
          label="Email address"
          placeholder="Enter your email..."
          autoComplete="email"
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <div className="space-y-2">
          <TextInput
            label="Password"
            placeholder="Enter your password..."
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <Button
            className="-ml-3.5 block"
            type="button"
            variant="light"
            onClick={() => {
              navigate(routes.forgotPassword)
            }}
          >
            Forgot password?
          </Button>
        </div>

        <Button type="submit" disabled={disabled} loading={isLoading}>
          Sign in
        </Button>

        <SmallText className="flex items-center gap-x-2">
          Not a member?
          <AnchorText
            onClick={() => {
              navigate(routes.signUp)
            }}
          >
            Sign up instead.
          </AnchorText>
        </SmallText>
      </form>
    </AuthLayout>
  )
}
