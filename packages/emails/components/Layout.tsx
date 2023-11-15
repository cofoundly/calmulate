import { Container, Img, Tailwind, Text } from '@react-email/components'
import { app } from 'config'
import React, { ReactNode } from 'react'

import { tailwindConfig } from '../tailwind.config'
import { DescriptionText } from './DescriptionText'

type LayoutProps = {
  siteUrl: string
  children?: ReactNode
}

export const Layout = ({ siteUrl, children }: LayoutProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <div className="bg-theme-background-muted px-8 py-16 font-sans">
        <Img className="mx-auto mb-8 h-8 w-8" src={`${siteUrl}/icon-emails.png`} />

        <Container className="border-theme-border bg-theme-background w-full max-w-xl rounded-xl border border-solid p-6 shadow-sm">
          {children}

          <DescriptionText>Cheers,</DescriptionText>
          <DescriptionText>The {app.name} team</DescriptionText>
        </Container>

        <Text className="text-theme-content m-0 mt-8 text-center text-sm">{app.name}</Text>
      </div>
    </Tailwind>
  )
}
