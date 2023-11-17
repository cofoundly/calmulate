// QUERIES
export const getTeamMembersQueryKey = (teamId: string) => `teams/${teamId}/members`

export enum QueryKeys {
  AuthUser = 'authUser',
  CalendarData = 'calendarData',
  Products = 'products',
  Prices = 'prices',
  Subscriptions = 'subscriptions',
  SubscriptionSeats = 'subscriptionSeats',
  SubscriptionInfo = 'subscriptionInfo',
  Teams = 'teams',
  User = 'user',
}

// USER MANAGEMENT
export enum UserManagementParams {
  Mode = 'mode',
  ActionCode = 'oobCode',
  NewPassword = 'newPassword',
  OldEmail = 'oldEmail',
  NewEmail = 'newEmail',
  Email = 'email',
}
