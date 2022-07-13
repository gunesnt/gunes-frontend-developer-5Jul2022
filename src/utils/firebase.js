import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import { FIREBASE_CONFIG } from 'constants'

console.log({ FIREBASE_CONFIG })

const app = initializeApp(FIREBASE_CONFIG)
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const auth = getAuth(app)
export const db = getFirestore(app)

export const createAuthUser = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password)

export const signInUser = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password)

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export const signOutUser = async () => await signOut(auth)

export const onAuthChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)
