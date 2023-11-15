import { Button, TextInput } from 'components'
import React, { FormEvent, useCallback, useState } from 'react'
import { validateEmail } from 'utils'

import { useRequestResetPassword } from '@/auth/hooks/useRequestResetPassword'
import { useUserEmail } from '@/user/hooks/useUserEmail'

type Props = {
  emailDisabled?: boolean // when signed in, we don't want the user to change their email here
}

export const ResetPassword = ({ emailDisabled = false }: Props) => {
  const [email, setEmail] = useUserEmail()
  const [newPassword, setNewPassword] = useState('')
  const { mutate: requestResetPassword, isLoading } = useRequestResetPassword()

  const isEmailValid = validateEmail(email)
  const disabled = !email || !isEmailValid || !newPassword

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (disabled) {
        return
      }

      await requestResetPassword({
        email,
        newPassword,
      })
    },
    [disabled, email, newPassword, requestResetPassword],
  )

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <TextInput
        type="email"
        label="Email address"
        placeholder="Enter your email..."
        autoComplete="email"
        required
        disabled={emailDisabled}
        value={email}
        onChange={event => setEmail(event.target.value)}
      />

      <TextInput
        type="password"
        label="New password"
        placeholder="Enter your new password..."
        autoComplete="password"
        required
        value={newPassword}
        onChange={event => setNewPassword(event.target.value)}
      />

      <Button type="submit" disabled={disabled} loading={isLoading}>
        Send password reset email
      </Button>
    </form>
  )
}
