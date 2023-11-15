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

export const TeamDeleted = ({ siteUrl, userName = '', teamName, adminTeamMemberName }: Props) => {
  return (
    <Layout siteUrl={siteUrl}>
      <TitleText>Hi{userName ? ` ${userName}` : ''},</TitleText>

      <DescriptionText className="mb-8">
        The "{teamName}" team has been deleted by {adminTeamMemberName} and you are no longer a member.
      </DescriptionText>
    </Layout>
  )
}

export default TeamDeleted
