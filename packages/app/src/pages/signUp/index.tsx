import { Alert, AnchorText, Button, SmallText, TextInput } from 'components'
import { FormEvent, useCallback, useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from 'utils'

import { useSignUpWithPassword } from '@/auth/hooks/useSignUpWithPassword'
import { AuthLayout } from '@/components/authLayout/AuthLayout'
import { routes } from '@/router/routes'
import { useUserEmail } from '@/user/hooks/useUserEmail'

import { app } from '../../../../config'

export const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useUserEmail()
  const [password, setPassword] = useState('')

  const { mutate: signUpWithPassword, isLoading } = useSignUpWithPassword()
  const navigate = useNavigate()

  const isEmailValid = validateEmail(email)
  const disabled = !email || !password || !isEmailValid || !firstName || !lastName
  const hasSubscriptionSuccess = new URLSearchParams(window.location.search).get('success') === 'true'

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (disabled) {
        return
      }

      await signUpWithPassword({
        firstName,
        lastName,
        email,
        password,
      })
    },
    [disabled, email, firstName, lastName, password, signUpWithPassword],
  )

  return (
    <>
      <AuthLayout title={`Sign up to ${app.name}`}>
        {hasSubscriptionSuccess && (
          <Alert variant="success">Your subscription was purchased successfully. Please sign up to continue.</Alert>
        )}

        <form className="space-y-6" onSubmit={onSubmit}>
          <TextInput
            className="flex-1"
            label="First name"
            placeholder="Enter your first name..."
            required
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
          />

          <TextInput
            className="flex-1"
            label="Last name"
            placeholder="Enter your last name..."
            required
            value={lastName}
            onChange={event => setLastName(event.target.value)}
          />

          <TextInput
            type="email"
            label="Email address"
            placeholder="Enter your email..."
            autoComplete="email"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <TextInput
            label="Password"
            placeholder="Enter your password..."
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <Button type="submit" disabled={disabled} loading={isLoading}>
            Sign up
          </Button>

          <SmallText className="flex items-center gap-x-2">
            Already a member?
            <AnchorText
              onClick={() => {
                navigate(routes.signIn)
              }}
            >
              Sign in instead.
            </AnchorText>
          </SmallText>
        </form>
      </AuthLayout>
    </>
  )
}
