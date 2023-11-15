import { useMutation } from '@tanstack/react-query'
import { useLink } from 'utils'

import { createCheckoutSession } from '../api/createCheckoutSession'

export const useCreateCheckoutSession = () => {
  const link = useLink()

  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: response => {
      // on success, redirect to the checkout session
      link(response.data.url, '_self')
    },
  })
}
