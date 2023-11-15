import { sentry } from './sentry'

export const captureException = async (exception: any) => {
  await sentry.captureException(exception)
}
