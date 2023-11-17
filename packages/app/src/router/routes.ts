export const TEAM_ID_PARAM = ':teamId'
export const TEAM_MEMBER_ID_PARAM = ':teamMemberId'

export const routes = {
  back: -1,
  signUp: '/sign-up',
  signIn: '/sign-in',
  forgotPassword: '/forgot-password',
  userManagement: '/user-management',
  dashboard: '/',
  settings: '/settings',
  settingsAccount: '/settings/account',
  settingsSubscription: '/settings/subscription',
  settingsIntegrations: '/settings/integrations',
  settingsTeam: `/settings/teams/${TEAM_ID_PARAM}`,
  settingsDeleteTeam: `/settings/teams/${TEAM_ID_PARAM}/delete`,
  settingsInviteTeamMembers: `/settings/teams/${TEAM_ID_PARAM}/invite`,
  settingsTeamMember: `/settings/teams/${TEAM_ID_PARAM}/members/${TEAM_MEMBER_ID_PARAM}`,
  settingsRemoveTeamMember: `/settings/teams/${TEAM_ID_PARAM}/members/${TEAM_MEMBER_ID_PARAM}/remove`,
}
