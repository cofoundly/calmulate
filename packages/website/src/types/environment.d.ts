declare namespace NodeJS {
  interface ProcessEnv {
    MODE: 'development' | 'staging' | 'production'
    NEXT_PUBLIC_URL: string
    NEXT_PUBLIC_APP_URL: string
    NEXT_PUBLIC_APP_SIGN_IN_URL: string
    NEXT_PUBLIC_APP_SIGN_UP_URL: string
    NEXT_PUBLIC_FIREBASE_API_KEY: string
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
    NEXT_PUBLIC_FIREBASE_APP_ID: string
    NEXT_PUBLIC_MIXPANEL_TOKEN: string
  }
}
