import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Paste your Firebase project config values below.
// Find them at: Firebase Console → Project Settings → Your Apps → SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQbQhSbtzFocKo6PKBGudSFygM1CnDBU",
  authDomain: "stock-simulator-815e3.firebaseapp.com",
  projectId: "stock-simulator-815e3",
  storageBucket: "stock-simulator-815e3.firebasestorage.app",
  messagingSenderId: "968172192379",
  appId: "1:968172192379:web:774aebb699009372d198de",
  measurementId: "G-HXKE7P1HWE"
}

/**
 * True only when all required config keys are non-empty.
 * Used to guard Firebase calls so the leaderboard renders a helpful
 * "not configured" message instead of throwing a runtime error.
 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId,
)

// Prevent duplicate initialization in Next.js hot-reload environments
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(app)
