import { Loading } from 'components'
import React, { useEffect } from 'react'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { useIsSubscriptionOwner } from '@/billing/hooks/useIsSubscriptionOwner'

import { ManagedSubscriptionSection } from './components/managedSubscriptionSection/ManagedSubscriptionSection'
import { Pricing } from './components/pricing/Pricing'
import { SubscriptionDetailsSection } from './components/subscriptionDetailsSection/SubscriptionDetailsSection'
import { SubscriptionSeatsSection } from './components/subscriptionSeatsSection/SubscriptionSeatsSection'

const WAITING_FOR_SUBSCRIPTION_TIMEOUT = 5000

export const SettingsSubscription = () => {
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const { data: isSubscriptionOwner, isLoading: isSubscriptionOwnerLoading } = useIsSubscriptionOwner()

  const [waitingForSubscription, setWaitingForSubscription] = React.useState(false)

  const hasSubscriptionSuccess = new URLSearchParams(window.location.search).get('success') === 'true'
  const isLoading = hasActiveSubscriptionLoading || isSubscriptionOwnerLoading || waitingForSubscription

  useEffect(() => {
    // our BE is async when it comes to subscriptions so when a user purchases a subscription, we need to wait a bit
    if (hasSubscriptionSuccess) {
      setWaitingForSubscription(true)

      setTimeout(() => {
        setWaitingForSubscription(false)
      }, WAITING_FOR_SUBSCRIPTION_TIMEOUT)
    }
  }, [hasSubscriptionSuccess])

  if (isLoading) {
    return <Loading />
  }

  if (!hasActiveSubscription) {
    return <Pricing />
  }

  const hasManagedSubscription = !isSubscriptionOwner

  if (hasManagedSubscription) {
    return <ManagedSubscriptionSection />
  }

  return (
    <div>
      <SubscriptionDetailsSection />

      <SubscriptionSeatsSection />
    </div>
  )
}
