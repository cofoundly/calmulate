import React, { ReactNode } from 'react'

import { AppProvider } from '@/components/appProvider/AppProvider'

import { MockRouter } from './MockRouter'

type MockAppProviderProps = {
  children: ReactNode
}

export const MockAppProvider = ({ children }: MockAppProviderProps) => (
  <AppProvider>
    <MockRouter>{children}</MockRouter>
  </AppProvider>
)
