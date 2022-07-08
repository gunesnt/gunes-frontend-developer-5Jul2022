// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD-91CYGajtdcx54W6sQKOtxCOci4hkF_U',
  authDomain: 'assignment-5jul2022.firebaseapp.com',
  projectId: 'assignment-5jul2022',
  storageBucket: 'assignment-5jul2022.appspot.com',
  messagingSenderId: '486546774379',
  appId: '1:486546774379:web:24fb06407f2175db42542e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.getCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
