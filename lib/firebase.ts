import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Paste your Firebase project config values below.
// Find them at: Firebase Console → Project Settings → Your Apps → SDK setup and configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

// Prevent duplicate initialization in Next.js hot-reload environments
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(app)
