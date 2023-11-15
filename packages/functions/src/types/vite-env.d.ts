/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv {
  VITE_STRIPE_API_KEY: string
  VITE_STRIPE_WEBHOOK_SIGNING_SECRET: string
  VITE_RESEND_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
