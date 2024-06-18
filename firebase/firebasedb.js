import { initializeApp, getApps, getApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const fireStore = getFirestore(app)
const fireStorage = getStorage(app)

export { fireStore, fireStorage }
export const USER_COLLECTION = collection(fireStore, 'users')
