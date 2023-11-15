import { Alert, Button, SmallText, TextInput } from 'components'
import React, { useEffect, useState } from 'react'

import { useHasTeamPlan } from '@/billing/hooks/useHasTeamPlan'
import { usePrices } from '@/billing/hooks/usePrices'
import { useSubscriptionInfo } from '@/billing/hooks/useSubscriptionInfo'
import { useUpdateSubscriptionQuantity } from '@/billing/hooks/useUpdateSubscriptionQuantity'
import { PageSection } from '@/components/pageSection/PageSection'
import { getSubscriptionSeatsButtonLabel } from '@/pages/settings/subscription/components/subscriptionSeatsSection/getSubscriptionSeatsButtonLabel'

const MIN_SEATS = 1

export const SubscriptionSeatsSection = () => {
  const { data: prices } = usePrices()
  const { data: hasTeamPlan, isLoading: hasTeamPlanLoading } = useHasTeamPlan()
  const { data: subscriptionInfo, isLoading: subscriptionInfoLoading } = useSubscriptionInfo()

  const [seats, setSeats] = useState(MIN_SEATS.toString())

  const { mutate: updateSubscriptionQuantity, isLoading: updateSubscriptionQuantityLoading } =
    useUpdateSubscriptionQuantity()

  const activePrice = prices?.find(price => price.id === subscriptionInfo?.priceId)
  const numberOfNewSeats = subscriptionInfo?.totalSeats ? parseInt(seats) - subscriptionInfo.totalSeats : 0
  const inputDisabled =
    hasTeamPlanLoading || !hasTeamPlan || subscriptionInfoLoading || updateSubscriptionQuantityLoading
  const newSeatsLessThanAssignedSeats = subscriptionInfo && parseInt(seats) < subscriptionInfo.assignedSeats
  const buttonDisabled =
    !activePrice || !numberOfNewSeats || newSeatsLessThanAssignedSeats || updateSubscriptionQuantityLoading

  useEffect(() => {
    if (subscriptionInfo && subscriptionInfo.totalSeats) {
      setSeats(subscriptionInfo.totalSeats.toString())
    }
  }, [subscriptionInfo])

  return (
    <PageSection
      className="border-b-0"
      title="Subscription seats"
      description={
        hasTeamPlan
          ? 'Add or remove seats from your subscription.'
          : 'Adding seats to your subscription is only available on the team plan.'
      }
      fullWidth={false}
    >
      <SmallText>
        Available Seats: {subscriptionInfo?.availableSeats} / {subscriptionInfo?.totalSeats}
      </SmallText>

      <TextInput
        className="w-20"
        type="number"
        placeholder="Enter seats"
        min={MIN_SEATS}
        disabled={inputDisabled}
        value={seats}
        onChange={event =>
          parseInt(event.target.value) >= MIN_SEATS ? setSeats(event.target.value) : setSeats(MIN_SEATS.toString())
        }
      />

      {newSeatsLessThanAssignedSeats && (
        <Alert variant="error">
          You cannot remove seats below the number of available seats. Please remove assigned seats first.
        </Alert>
      )}

      {activePrice && (
        <div>
          <Button
            loading={updateSubscriptionQuantityLoading}
            disabled={buttonDisabled}
            onClick={() => {
              updateSubscriptionQuantity(parseInt(seats))
            }}
          >
            {getSubscriptionSeatsButtonLabel(numberOfNewSeats, activePrice)}
          </Button>
        </div>
      )}
    </PageSection>
  )
}
