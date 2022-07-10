import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ProfilePage from 'pages/profile'
import SignInPage from 'pages/sign-in'

const App = () => (
  <Routes>
    <Route path="/" element={<ProfilePage />} />
    <Route path="/sign-in" element={<SignInPage />} />
  </Routes>
)

export default App
