import { HeadingText, SmallText } from 'components'
import React from 'react'

import { Header } from '@/components/header/Header'
import { PageLayout } from '@/components/pageLayout/PageLayout'

export const Dashboard = () => {
  return (
    <>
      <Header />

      <PageLayout>
        <HeadingText>Dashboard</HeadingText>

        <SmallText className="mt-2">Insert your app here 🚀</SmallText>
      </PageLayout>
    </>
  )
}
