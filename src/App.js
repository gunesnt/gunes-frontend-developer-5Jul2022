import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { SIGN_IN_PATH, SIGN_UP_PATH } from 'constants'
import { AuthProvider, RequireAuth } from 'contexts/auth'
import { UserProvider } from 'contexts/user'
import ProfilePage from 'pages/profile'
import SignInPage from 'pages/sign-in'
import SignUpPage from 'pages/sign-up'

const App = () => (
  <UserProvider>
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path={SIGN_IN_PATH} element={<SignInPage />} />
        <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
      </Routes>
    </AuthProvider>
  </UserProvider>
)

export default App
