import React from 'react'

import { PageSection } from '@/components/pageSection/PageSection'

export const ManagedSubscriptionSection = () => {
  return (
    <PageSection
      className="border-b-0"
      title="Subscription managed by another user"
      description="You're not the owner of this subscription. Please contact the subscription owner to manage your subscription."
      fullWidth={false}
    />
  )
}
