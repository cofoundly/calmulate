import { useIdentifyUser } from '@/analytics/hooks/useIdentifyUser'
import { useAuthListener } from '@/auth/hooks/useAuthListener'
import { useSubscriptionInfoListener } from '@/billing/hooks/useSubscriptionInfoListener'
import { useSubscriptionsListener } from '@/billing/hooks/useSubscriptionsListener'

export const Listeners = (): null => {
  useAuthListener()
  useIdentifyUser()
  useSubscriptionsListener()
  useSubscriptionInfoListener()

  return null
}
