import * as Sentry from '@sentry/react'

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
const ENVIRONMENT = import.meta.env.VITE_SENTRY_ENV
const IGNORED_SENTRY_ERRORS: string[] = [
  'auth/wrong-password',
  'auth/network-request-failed',
  'auth/email-already-in-use',
  'auth/invalid-login-credentials',
]

if (!import.meta.env.DEV && SENTRY_DSN && ENVIRONMENT) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
    ignoreErrors: IGNORED_SENTRY_ERRORS,
  })
}

export { Sentry as sentry }
