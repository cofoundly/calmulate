import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryClientProviderPrimitive,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FirebaseError } from 'firebase/app'
import React, { ReactNode } from 'react'
import { toast } from 'react-hot-toast'

const handleError = (error: unknown) => {
  console.error(error)

  const isFirebaseError = error instanceof FirebaseError

  if (isFirebaseError && error.code === 'permission-denied') {
    toast.error('You do not have permission to access this resource.')
  } else {
    toast.error((error as Error).message)
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    // enables global error handling
    onError(error) {
      handleError(error)
    },
  }),
  mutationCache: new MutationCache({
    // enables global error handling
    onError(error) {
      handleError(error)
    },
  }),
})

type Props = { children: ReactNode }

export const QueryClientProvider = ({ children }: Props) => {
  return (
    <QueryClientProviderPrimitive client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" panelPosition="right" />
    </QueryClientProviderPrimitive>
  )
}
