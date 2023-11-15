import React from 'react'

import { Button } from '../components/Button'
import { DescriptionText } from '../components/DescriptionText'
import { Layout } from '../components/Layout'
import { TitleText } from '../components/TitleText'

type Props = {
  siteUrl: string
  link: string
}

export const ResetPassword = ({ siteUrl, link }: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <TitleText>Reset password</TitleText>

      <DescriptionText>Follow this link to reset the password for your user:</DescriptionText>

      <Button href={link}>Reset password</Button>
    </Layout>
  )
}

export default ResetPassword
