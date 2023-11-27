import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { FirebaseError } from 'firebase/app'
import React, { ReactNode } from 'react'
import { toast } from 'react-hot-toast'

import { captureException } from '@/errors/api/captureException'

const handleError = (error: unknown) => {
  console.error(error)

  const isFirebaseError = error instanceof FirebaseError

  if (isFirebaseError && error.code === 'permission-denied') {
    toast.error('You do not have permission to access this resource.')
  } else {
    toast.error((error as Error).message)
  }

  captureException(error)
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

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

type Props = { children: ReactNode }

export const QueryClientProvider = ({ children }: Props) => {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" panelPosition="right" />
    </PersistQueryClientProvider>
  )
}
