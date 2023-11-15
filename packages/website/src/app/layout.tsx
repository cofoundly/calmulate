import '@/styles/index.css'

import { Snackbar } from 'components'
import { type Metadata } from 'next'
import React, { ReactNode } from 'react'

import { AppProvider } from '@/components/appProvider/AppProvider'
import { MainLayout } from '@/components/mainLayout/MainLayout'

import { app, tailwindTheme } from '../../../config'

export const metadata: Metadata = {
  title: {
    template: `%s - ${app.name}`,
    default: `${app.name}`,
  },
  description: `${app.description}`,
  themeColor: tailwindTheme.extend.colors.theme.brand.DEFAULT,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth font-sans antialiased">
      <body className="h-full bg-theme-background dark:bg-dark-theme-background">
        <AppProvider>
          <MainLayout>{children}</MainLayout>

          <Snackbar />
        </AppProvider>
      </body>
    </html>
  )
}
