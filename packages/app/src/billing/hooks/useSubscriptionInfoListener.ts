import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useAuthUser } from '@/auth/hooks/useAuthUser'
import { features } from '@/features'
import { QueryKeys } from '@/types'

import { listenSubscriptionInfo } from '../api/listenSubscriptionInfo'
import { useSubscriptionSeats } from './useSubscriptionSeats'

export const useSubscriptionInfoListener = () => {
  const queryClient = useQueryClient()
  const { data: subscriptionSeats } = useSubscriptionSeats()
  const { data: authUser } = useAuthUser()

  // NOTE: this assumes we only have one subscription per user
  const subscriptionId = subscriptionSeats?.length && subscriptionSeats[0].subscriptionId

  useEffect(() => {
    if (features.subscriptions && authUser && subscriptionId) {
      // subscribe to the subscription info changes
      const unsubscribe = listenSubscriptionInfo(subscriptionId, subscriptionInfo => {
        queryClient.setQueryData([QueryKeys.SubscriptionInfo], subscriptionInfo)
      })

      return unsubscribe
    }
  }, [authUser, queryClient, subscriptionId])
}
