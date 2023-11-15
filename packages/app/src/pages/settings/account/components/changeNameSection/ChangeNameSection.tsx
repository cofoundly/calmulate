import { Button, TextInput } from 'components'
import React, { useEffect, useState } from 'react'

import { PageSection } from '@/components/pageSection/PageSection'
import { useUpdateUser } from '@/user/hooks/useUpdateUser'
import { useUser } from '@/user/hooks/useUser'

export const ChangeNameSection = () => {
  const { data: user } = useUser()

  const firstName = user?.firstName || ''
  const [newFirstName, setNewFirstName] = useState(firstName)

  const lastName = user?.lastName || ''
  const [newLastName, setNewLastName] = useState(lastName)

  const { mutate: updateUser, isLoading } = useUpdateUser()

  // disable the save button if the name is the same as the current name or if the name is invalid
  const disabled = !newFirstName || !newLastName || (firstName === newFirstName && lastName === newLastName)

  useEffect(() => {
    // if the authUser names update, update newFirstName and newLastName
    setNewFirstName(firstName)
    setNewLastName(lastName)
  }, [firstName, lastName])

  return (
    <PageSection
      className="pt-0 lg:pt-0"
      title="Change name"
      description="Update your personal details associated with your account."
      fullWidth={false}
    >
      <div className="flex flex-wrap gap-6 lg:flex-nowrap">
        <TextInput
          className="flex-1"
          label="First name"
          placeholder="Enter your first name..."
          value={newFirstName}
          onChange={event => setNewFirstName(event.target.value)}
        />

        <TextInput
          className="flex-1"
          label="Last name"
          placeholder="Enter your last name..."
          value={newLastName}
          onChange={event => setNewLastName(event.target.value)}
        />
      </div>

      <div>
        <Button
          disabled={disabled}
          loading={isLoading}
          onClick={() => {
            if (!user?.id) {
              return
            }

            updateUser({
              id: user.id,
              firstName: newFirstName,
              lastName: newLastName,
            })
          }}
        >
          Save
        </Button>
      </div>
    </PageSection>
  )
}
