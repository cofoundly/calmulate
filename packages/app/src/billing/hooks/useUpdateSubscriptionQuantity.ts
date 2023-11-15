import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateSubscriptionQuantity } from '../api/updateSubscriptionQuantity'

export const useUpdateSubscriptionQuantity = () => {
  return useMutation({
    mutationFn: updateSubscriptionQuantity,
    onSuccess: () => {
      toast.success('Subscription quantity updated')

      // Note: we get realtime subscription updates so there is no need to invalidate the subscription query
    },
  })
}
