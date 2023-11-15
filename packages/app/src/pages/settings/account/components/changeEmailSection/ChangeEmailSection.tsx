import { Button, TextInput } from 'components'
import React, { useEffect, useState } from 'react'
import { validateEmail } from 'utils'

import { useSendChangeEmailVerification } from '@/auth/hooks/useSendChangeEmailVerification'
import { PageSection } from '@/components/pageSection/PageSection'
import { useUser } from '@/user/hooks/useUser'

export const ChangeEmailSection = () => {
  const { data: user } = useUser()
  const { mutate: sendChangeEmailVerification, isLoading } = useSendChangeEmailVerification()

  const email = user?.email || ''
  const [newEmail, setNewEmail] = useState(email)

  // disable the save button if the email is the same as the current email or if the email is invalid
  const disabled = email === newEmail || !validateEmail(newEmail)

  useEffect(() => {
    // if the authUser email updates, update newEmail
    setNewEmail(email)
  }, [email])

  return (
    <PageSection
      title="Change email"
      description="Update your email address associated with your account."
      fullWidth={false}
    >
      <TextInput
        label="New email address"
        type="email"
        placeholder="Enter your email..."
        autoComplete="email"
        value={newEmail}
        onChange={event => setNewEmail(event.target.value)}
      />

      <div>
        <Button
          disabled={disabled}
          loading={isLoading}
          onClick={() => {
            sendChangeEmailVerification({ newEmail, oldEmail: email })
          }}
        >
          Save
        </Button>
      </div>
    </PageSection>
  )
}
