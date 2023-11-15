import React, { ReactNode } from 'react'

import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'

type Props = {
  children?: ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header className="fixed inset-x-0 top-0 z-20" />

      <main className="min-h-full">{children}</main>

      <Footer />
    </>
  )
}
