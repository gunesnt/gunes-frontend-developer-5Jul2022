import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  createAuthUser,
  onAuthChangedListener,
  signInUser,
  signInWithGoogle,
  signOutUser,
} from 'utils/firebase'

import { DEFAULT_PROTECTED_PATH, SIGN_IN_PATH } from 'constants'
import { useUser } from './user'

const AUTH = {
  currentUser: null,
  isAuthenticated: false,
  fetched: false,
}

export const AuthContext = createContext(AUTH)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const { createUser } = useUser()
  const [auth, setAuth] = useState(AUTH)
  const navigate = useNavigate()
  const location = useLocation()

  const onAuthChanged = (user) => {
    setAuth({ currentUser: user, isAuthenticated: !!user, fetched: true })
  }

  useEffect(() => {
    onAuthChangedListener((user) => onAuthChanged(user))
  }, [])

  const redirect = () => {
    const from = location.state?.from?.pathname || DEFAULT_PROTECTED_PATH
    navigate(from, { replace: true })
  }

  const signIn = async (email, password) => {
    const { user } = await signInUser(email, password)
    if (user) redirect()
  }

  const GoogleSignIn = async () => {
    const { user } = await signInWithGoogle()
    if (user) {
      await createUser(user)
      redirect()
    }
  }

  const signOut = async () => await signOutUser()

  const signUp = async (email, password, userInfo) => {
    const { user } = await createAuthUser(email, password)
    if (user) {
      await createUser(user, userInfo)
      redirect()
    }
  }

  return (
    <AuthContext.Provider
      value={{ ...auth, onAuthChanged, signIn, GoogleSignIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export const RequireAuth = ({ children }) => {
  const { isAuthenticated, fetched } = useAuth()
  const location = useLocation()

  if (!fetched) return null

  if (!isAuthenticated)
    return <Navigate to={SIGN_IN_PATH} state={{ from: location }} replace />

  return children
}
