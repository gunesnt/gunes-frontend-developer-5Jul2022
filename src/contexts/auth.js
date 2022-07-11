import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
} from 'utils/firebase'

const DEFAULT_PROTECTED_REDIRECT = '/'

const AUTH = {
  user: null,
  isAuthenticated: false,
  fetched: false,
  onAuthChanged: () => null,
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
}

export const AuthContext = createContext(AUTH)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(AUTH)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || DEFAULT_PROTECTED_REDIRECT

  const onAuthChanged = (user) => {
    console.log({ user })
    setAuth({ user, isAuthenticated: !!user, fetched: true })
  }

  useEffect(() => {
    onAuthStateChangedListener((user) => onAuthChanged(user))
  }, [])

  const signIn = async (email, password) => {
    const result = await signInAuthUserWithEmailAndPassword(email, password)
    if (result.user) navigate(from, { replace: true })
  }

  const signOut = async () => await signOutUser()

  const signUp = async (email, password, additionalInfos) => {
    const { user } = await createAuthUserWithEmailAndPassword(email, password)

    if (user) {
      if (additionalInfos) {
        const {} = await createUserDocumentFromAuth(user, additionalInfos)
      }

      navigate(from, { replace: true })
    }
  }

  return (
    <AuthContext.Provider
      value={{ ...auth, onAuthChanged, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export const RequireAuth = ({ children }) => {
  const { isAuthenticated, fetched } = useAuth()
  const location = useLocation()

  if (!fetched) return null

  if (!isAuthenticated)
    return <Navigate to="/sign-in" state={{ from: location }} replace />

  return children
}
