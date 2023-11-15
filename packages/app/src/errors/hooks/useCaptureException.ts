import { useMutation } from '@tanstack/react-query'

import { captureException } from '../api/captureException'

export const useCaptureException = () => {
  return useMutation({
    mutationFn: captureException,
  })
}
