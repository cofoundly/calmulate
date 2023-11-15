import { app } from 'config'
import React from 'react'

import { Button } from '../components/Button'
import { DescriptionText } from '../components/DescriptionText'
import { Layout } from '../components/Layout'
import { TitleText } from '../components/TitleText'

type Props = {
  siteUrl: string
  userName: string
  teamName: string
  adminTeamMemberName: string
  buttonUrl: string
  buttonText: string
}

export const AddedToTeam = ({
  siteUrl,
  userName = '',
  teamName,
  adminTeamMemberName,
  buttonUrl,
  buttonText,
}: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <TitleText>Hi{userName ? ` ${userName}` : ''},</TitleText>

      <DescriptionText>
        You've been added to team "{teamName}" on {app.name} by {adminTeamMemberName}.
      </DescriptionText>

      <Button href={buttonUrl}>{buttonText}</Button>
    </Layout>
  )
}

export default AddedToTeam
