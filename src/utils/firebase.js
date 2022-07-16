import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
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

const app = initializeApp(FIREBASE_CONFIG)
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export const createAuthUser = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password)

export const signInUser = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password)

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export const signOutUser = async () => await signOut(auth)

export const onAuthChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)

export const uploadFile = async (file, uploadPath) => {
  const storageRef = ref(storage, uploadPath)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}
