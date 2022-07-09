import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

import Header from 'components/Header'
import Footer from 'components/Footer'
import ProfilePage from 'pages/profile'
import SignInPage from 'pages/sign-in'

const App = () => (
  <Container maxWidth={false} disableGutters>
    <Header />
    <Toolbar />
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
    <Footer />
  </Container>
)

export default App
