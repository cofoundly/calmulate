/* USERS */
export type BillingAddress = {
  city: string
  line1: string
  line2?: string
  state: string
  country: string
  postalCode: string
}

export type PaymentMethod = {
  brand: string
  expMonth: number
  expYear: number
  last4: string
}

type UserId = string
type UserEmail = string

export type User = {
  id: UserId
  createdAt: string
  email: UserEmail
  emailVerified: boolean
  firstName: string
  lastName: string
  billingAddress?: BillingAddress
  paymentMethod?: PaymentMethod
}

/* BILLING */
type StripeCustomerId = string

export type Customer = {
  id: StripeCustomerId
  ownerId: UserId | null // this will be null for guest users from the website
}

export type ProductMetadata = {
  features: string // JSON stringified array of strings
  freeTrialDays: number
  teamPlan: boolean
}

export type Product = {
  id: string
  name: string
  description: string
  active: boolean
  image: string
  metadata?: ProductMetadata | Record<string, string>
}

export enum PricingType {
  OneTime = 'oneTime',
  Recurring = 'recurring',
}

export enum BillingInterval {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

type PriceId = string

export type Price = {
  id: PriceId
  productId: string
  active: boolean
  currency: string
  type: PricingType
  interval: BillingInterval
  intervalCount: number
  trialPeriodDays: number
  unitAmount: number
  metadata: Record<string, string>
}

// ui type shared between app and website
export type PricingCardProduct = {
  id: PriceId
  title: string
  description?: string
  currency?: string
  price: number | string
  priceInfo?: string
  features: string[]
  buttonText?: string
  highlight?: boolean
  loading?: boolean
}

export enum SubscriptionStatus {
  Trialing = 'trialing',
  Active = 'active',
  Cancelled = 'cancelled',
  Incomplete = 'incomplete',
  IncompleteExpired = 'incomplete_expired',
  PastDue = 'past_due',
  Unpaid = 'unpaid',
  Paused = 'paused',
}

export type SubscriptionId = string

export type Subscription = {
  id: SubscriptionId
  stripeCustomerId: StripeCustomerId
  ownerId: UserId | null // this will be null for guest users from the website
  email: string | null // the email is used to find unowned subscriptions of guest users from the website
  priceId: PriceId
  quantity: number
  status: SubscriptionStatus
  created: string
  trialStart: string
  trialEnd: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAt: string
  cancelAtPeriodEnd: boolean
  canceledAt: string
  endedAt: string
  metadata: Record<string, string>
}

export type SubscriptionSeat = {
  id: string
  createdAt: string
  subscriptionId: SubscriptionId
  userId: UserId | null // the userId is null if the user does not have an account yet
  email: string | null // the email is used to find assigned seats of new users (it's null for subscription owners because we don't need to find their seats)
  isSubscriptionOwner: boolean
}

export type SubscriptionInfo = {
  id: SubscriptionId
  priceId: PriceId // this is used to check if a team admin is on the team plan
  status: SubscriptionStatus
  totalSeats: number
  assignedSeats: number
  availableSeats: number
}

/* TEAMS */
type TeamId = string

export type Team = {
  id: TeamId
  createdAt: string
  name: string
  ownerId: string
  subscriptionId: SubscriptionId
}

export enum TeamMemberRole {
  Admin = 'admin',
  Member = 'member',
}

export enum TeamMemberStatus {
  Active = 'active',
  Invited = 'invited',
}

export type TeamMember = {
  id: string
  createdAt: string
  teamId: string
  userId: UserId | null // the userId is null if the user does not have an account yet
  firstName: string | null // as above
  lastName: string | null // as above
  email: string
  role: TeamMemberRole
  status: TeamMemberStatus
  invitedBy: UserId
}

export type TeamWithMembers = Team & {
  members: TeamMember[]
}

/* FIRESTORE */
export enum FirestoreCollection {
  Customers = 'customers',
  Prices = 'prices',
  Products = 'products',
  Subscriptions = 'subscriptions',
  SubscriptionSeats = 'seats',
  SubscriptionInfo = 'subscriptionInfo',
  Teams = 'teams',
  TeamMembers = 'members',
  Users = 'users',
}

/* FUNCTIONS */
export enum Functions {
  changeUserEmail = 'changeUserEmailFunction',
  createBillingPortalSession = 'createBillingPortalSessionFunction',
  createCheckoutSession = 'createCheckoutSessionFunction',
  deleteUserAccount = 'deleteUserAccountFunction',
  inviteTeamMembers = 'inviteTeamMembersFunction',
  removeTeamMember = 'removeTeamMemberFunction',
  requestResetPassword = 'requestResetPasswordFunction',
  sendChangeEmailVerification = 'sendChangeEmailVerificationFunction',
  sendEmailVerification = 'sendEmailVerificationFunction',
  updateSubscriptionQuantity = 'updateSubscriptionQuantityFunction',
  verifyEmail = 'verifyEmailFunction',
}

export type FunctionsMap = {
  [Functions.changeUserEmail]: {
    data: {
      oldEmail: string
      newEmail: string
    }
    response: {
      ok: true
    }
  }
  [Functions.createBillingPortalSession]: {
    data: {
      returnUrl: string
    }
    response: {
      url: string
    }
  }
  [Functions.createCheckoutSession]: {
    data: {
      priceId: string
      quantity: number
      successUrl: string
      cancelUrl: string
      metadata?: Record<string, string>
    }
    response: {
      url: string
    }
  }
  [Functions.deleteUserAccount]: {
    data: object
    response: {
      ok: true
    }
  }
  [Functions.inviteTeamMembers]: {
    data: {
      teamId: string
      emails: string[]
      signUpUrl: string
    }
    response: {
      ok: true
    }
  }
  [Functions.removeTeamMember]: {
    data: {
      teamId: string
      teamMemberId: string
    }
    response: {
      ok: true
    }
  }
  [Functions.requestResetPassword]: {
    data: {
      email: string
      newPassword: string
      redirectUrl: string
    }
    response: {
      ok: true
    }
  }
  [Functions.sendChangeEmailVerification]: {
    data: {
      oldEmail: string
      newEmail: string
      redirectUrl: string
    }
    response: {
      ok: true
    }
  }
  [Functions.sendEmailVerification]: {
    data: {
      email: string
      redirectUrl: string
    }
    response: {
      ok: true
    }
  }
  [Functions.updateSubscriptionQuantity]: {
    data: { quantity: number }
    response: {
      ok: true
    }
  }
  [Functions.verifyEmail]: {
    data: {
      actionCode: string
    }
    response: {
      ok: true
    }
  }
}
