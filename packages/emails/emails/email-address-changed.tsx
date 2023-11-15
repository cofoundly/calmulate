import React from 'react'

import { Button } from '../components/Button'
import { DescriptionText } from '../components/DescriptionText'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { TitleText } from '../components/TitleText'

type Props = {
  siteUrl: string
  oldEmail: string
  newEmail: string
}

export const EmailAddressChanged = ({ siteUrl, oldEmail, newEmail }: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <TitleText>Email address was changed</TitleText>

      <DescriptionText>
        Your email address was changed from <Link href={`mailto:${oldEmail}`}>{oldEmail}</Link> to{' '}
        <Link href={`mailto:${newEmail}`}>{newEmail}</Link>.
      </DescriptionText>

      <Button href={siteUrl}>Go to your dashboard</Button>
    </Layout>
  )
}

export default EmailAddressChanged
