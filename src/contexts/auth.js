import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from '@firebase/auth'
import {
  createAuthUser,
  onAuthChangedListener,
  signInUser,
  signInWithGoogle,
  signOutUser,
} from 'utils/firebase'

import { PROTECTED_PATH, SIGN_IN_PATH, SIGN_UP_COMPLETE_PATH } from 'constants'
import { useUser } from './user'
import { auth as firebaseAuth } from 'utils/firebase'

const AUTH = {
  authUser: null,
  isAuthenticated: false,
  signUpCompleted: false,
  fetched: false,
}

export const AuthContext = createContext(AUTH)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const { hasUser } = useUser()
  const [auth, setAuth] = useState(AUTH)
  const navigate = useNavigate()
  const location = useLocation()

  const onAuthChanged = async (authUser) => {
    const signUpCompleted = authUser && (await hasUser(authUser.uid))
    setAuth({
      authUser,
      isAuthenticated: !!authUser,
      signUpCompleted,
      fetched: true,
    })
  }

  useEffect(() => {
    onAuthChangedListener(onAuthChanged)
  }, [])

  const navigateAfterSign = () => {
    if (!auth.signUpCompleted) setAuth({ ...auth, signUpCompleted: true })
    const from = location.state?.from?.pathname || PROTECTED_PATH
    navigate(from, { replace: true })
  }

  const redirect = async (userId) => {
    if (await hasUser(userId)) {
      navigateAfterSign()
    } else {
      navigate(SIGN_UP_COMPLETE_PATH, { replace: true, state: location.state })
    }
  }

  const signIn = async (email, password, remember) => {
    await setPersistence(
      firebaseAuth,
      remember ? browserLocalPersistence : browserSessionPersistence,
    )
    const { user } = await signInUser(email, password)
    if (user) redirect(user.uid)
  }

  const GoogleSignIn = async () => {
    const { user } = await signInWithGoogle()
    if (user) redirect(user.uid)
  }

  const signOut = async () => await signOutUser()

  const signUp = async (email, password) => {
    const { user } = await createAuthUser(email, password)
    if (user) redirect(user.uid)
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        onAuthChanged,
        signIn,
        GoogleSignIn,
        signOut,
        signUp,
        navigateAfterSign,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const RequireAuth = ({ children }) => {
  const { isAuthenticated, fetched, signUpCompleted } = useAuth()
  const location = useLocation()

  if (!fetched) return null

  if (!isAuthenticated)
    return <Navigate to={SIGN_IN_PATH} state={{ from: location }} replace />

  if (location.pathname !== SIGN_UP_COMPLETE_PATH && !signUpCompleted)
    return (
      <Navigate to={SIGN_UP_COMPLETE_PATH} state={location.state} replace />
    )

  return children
}
