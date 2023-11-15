import React from 'react'

import { Button } from '../components/Button'
import { DescriptionText } from '../components/DescriptionText'
import { Layout } from '../components/Layout'
import { TitleText } from '../components/TitleText'

type Props = {
  siteUrl: string
  emailVerificationLink: string
}

export const ChangeEmailVerification = ({ siteUrl, emailVerificationLink }: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <TitleText>Confirm your new email</TitleText>

      <DescriptionText>Follow this link to confirm your new email:</DescriptionText>

      <Button href={emailVerificationLink}>Confirm your mail</Button>
    </Layout>
  )
}

export default ChangeEmailVerification
