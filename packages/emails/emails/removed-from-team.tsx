import React from 'react'

import { DescriptionText } from '../components/DescriptionText'
import { Layout } from '../components/Layout'
import { TitleText } from '../components/TitleText'

type Props = {
  siteUrl: string
  userName: string
  teamName: string
  adminTeamMemberName: string
}

export const RemovedFromTeam = ({ siteUrl, userName = '', teamName, adminTeamMemberName }: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <TitleText>Hi{userName ? ` ${userName}` : ''},</TitleText>

      <DescriptionText className="mb-8">
        You've been removed from team "{teamName}" by {adminTeamMemberName}.
      </DescriptionText>
    </Layout>
  )
}

export default RemovedFromTeam
