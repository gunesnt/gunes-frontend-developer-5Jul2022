import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthProvider, RequireAuth } from 'contexts/auth'
import ProfilePage from 'pages/profile'
import SignInPage from 'pages/sign-in'
import SignUpPage from 'pages/sign-up'

const App = () => (
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
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  </AuthProvider>
)

export default App
