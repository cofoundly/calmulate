import { Button, Dialog } from 'components'
import React, { useState } from 'react'

import { useDeleteUserAccount } from '@/auth/hooks/useDeleteUserAccount'
import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { PageSection } from '@/components/pageSection/PageSection'

export const DeleteAccountSection = () => {
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const { mutate: deleteUserAccount, isLoading: deleteUserAccountLoading } = useDeleteUserAccount()

  const [dialogOpen, setDialogOpen] = useState(false)

  const isDisabled = hasActiveSubscriptionLoading || hasActiveSubscription

  return (
    <PageSection
      className="border-b-0"
      title="Delete account"
      description={
        hasActiveSubscription
          ? 'You cannot delete your account while you have an active subscription. Please cancel your subscription first.'
          : 'No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.'
      }
      fullWidth={false}
    >
      <div>
        <Button
          color="red"
          disabled={isDisabled}
          onClick={() => {
            setDialogOpen(true)
          }}
        >
          Yes, delete my account
        </Button>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
        }}
      >
        <Dialog.Header
          title="Are you sure you want to delete your account?"
          description="This action is not reversible. All information related to this account will be deleted permanently."
        />

        <Dialog.Actions
          confirmIsDangerous
          confirmLoading={deleteUserAccountLoading}
          onCancelClick={() => {
            setDialogOpen(false)
          }}
          onConfirmClick={async () => {
            await deleteUserAccount()

            setDialogOpen(false)
          }}
        />
      </Dialog>
    </PageSection>
  )
}
