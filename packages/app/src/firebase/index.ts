import { FirebaseOptions, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

import firebaseConfig from '../../../../firebase.json'

const config: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(config)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)

const LOCAL_HOST = '127.0.0.1'

if (import.meta.env.MODE === 'development') {
  try {
    connectAuthEmulator(auth, `http://${LOCAL_HOST}:${firebaseConfig.emulators.auth.port}`, {
      disableWarnings: true,
    })
    connectFirestoreEmulator(db, LOCAL_HOST, firebaseConfig.emulators.firestore.port)
    connectFunctionsEmulator(functions, LOCAL_HOST, firebaseConfig.emulators.functions.port)
    console.log('Connected to Firebase emulators.')
  } catch (error) {
    // silent error in case the emulators are not running
    console.error(error)
  }
}
