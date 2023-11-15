import firebase from 'firebase-admin'
import { getApps } from 'firebase-admin/app'

import firebaseConfig from '../../../../firebase.json'

// initialize firebase app if it doesn't already exist
if (!getApps().length) {
  firebase.initializeApp()
}

// if we're running in development, use the firebase emulator (if available)
if (process.env.MODE === 'development') {
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = `localhost:${firebaseConfig.emulators.auth.port}`
  process.env['FIRESTORE_EMULATOR_HOST'] = `localhost:${firebaseConfig.emulators.firestore.port}`
}

export { firebase }
