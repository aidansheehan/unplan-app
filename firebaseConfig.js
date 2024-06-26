import { initializeApp, getApps, getApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import 'firebase/storage'

/**
 * App firebase configuration
 */
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

//Initialize firebase only if it hasn't been initialized yet
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

// Initialize Cloud Firestore
const db = getFirestore(app)

// Initialize Firebase Authentication & get a reference to the service
const auth = getAuth(app)

//Connect to Firestore Emulator in development environment
if (process.env.NODE_ENV === 'development') {
  if (typeof window === 'undefined' || !window['_init']) {

    connectStorageEmulator(storage, 'localhost', 9199)  //Connect to storage emulator

    // TODO test working
    // connectAuthEmulator(auth, 'localhost', 9099)        //Connect to auth emulator
    connectAuthEmulator(auth, 'http://localhost:9099/')

    if (!db._settingsFrozen) {
      connectFirestoreEmulator(db, 'localhost', 8080)     //Connect to firestore emulator
    }

    if (typeof window !== 'undefined') window['_init'] = true
  }
}

// // Initialize analytics
// // const analytics = getAnalytics(app)

export { app, storage, db, auth }