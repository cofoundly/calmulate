import React from 'react'

import { Button } from '../components/Button'
import { DescriptionText } from '../components/DescriptionText'
import { Layout } from '../components/Layout'
import { TitleText } from '../components/TitleText'

type Props = {
  siteUrl: string
  emailVerificationLink: string
}

export const VerificationEmail = ({ siteUrl, emailVerificationLink }: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <TitleText>Confirm your signup</TitleText>

      <DescriptionText>Follow this link to confirm your user:</DescriptionText>

      <Button href={emailVerificationLink}>Confirm your mail</Button>
    </Layout>
  )
}

export default VerificationEmail
