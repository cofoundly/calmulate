import React from 'react'

import { PageSection } from '@/components/pageSection/PageSection'
import { ResetPassword } from '@/components/resetPassword/ResetPassword'

export const ChangePasswordSection = () => {
  return (
    <PageSection
      title="Change password"
      description="Update your password associated with your account."
      fullWidth={false}
    >
      <ResetPassword emailDisabled />
    </PageSection>
  )
}
