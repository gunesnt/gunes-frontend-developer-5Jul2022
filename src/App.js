import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { SIGN_IN_PATH, SIGN_UP_PATH, SIGN_UP_COMPLETE_PATH } from 'constants'
import { AuthProvider, RequireAuth } from 'contexts/auth'
import { UserProvider } from 'contexts/user'
import ProfilePage from 'pages/profile'
import SignInPage from 'pages/sign-in'
import SignUpPage from 'pages/sign-up'
import SignUpCompletePage from 'pages/sign-up-complete'

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <Route
            path={SIGN_UP_COMPLETE_PATH}
            element={
              <RequireAuth>
                <SignUpCompletePage />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </UserProvider>
  </LocalizationProvider>
)

export default App
