import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useAuthUser } from '@/auth/hooks/useAuthUser'
import { QueryKeys } from '@/types'

import { listenSubscriptionsForUser } from '../api/listenSubscriptionsForUser'

export const useSubscriptionsListener = () => {
  const queryClient = useQueryClient()
  const { data: user } = useAuthUser()

  const userId = user?.uid

  useEffect(() => {
    if (userId) {
      // subscribe to the user's subscriptions changes
      const unsubscribe = listenSubscriptionsForUser(userId, subscriptions => {
        queryClient.setQueryData([QueryKeys.Subscriptions], subscriptions)
      })

      return unsubscribe
    }
  }, [queryClient, userId])
}
