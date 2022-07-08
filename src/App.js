import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

import Header from 'components/Header'
import Profile from 'components/Profile'
import Footer from 'components/Footer'
import SignIn from 'components/Header/SignIn'

const App = () => (
  <Container maxWidth={false} disableGutters>
    <Header />
    <Toolbar />
    <Routes>
      <Route exact path="/" element={<Profile />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
    <Footer />
  </Container>
)

export default App
