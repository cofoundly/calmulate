import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { features } from '@/features'
import { QueryKeys } from '@/types'

import { onAuthStateChanged } from '../api/onAuthStateChanged'

export const useAuthListener = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!features.auth) {
      return
    }

    // subscribe to the user's auth changes
    const unsubscribe = onAuthStateChanged(authUser => {
      queryClient.setQueryData([QueryKeys.AuthUser], authUser)
    })

    return unsubscribe
  }, [queryClient])
}
