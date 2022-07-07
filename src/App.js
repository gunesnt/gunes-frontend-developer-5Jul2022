import React from 'react'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

import Header from 'components/Header'
import Profile from 'components/Profile'
import Footer from 'components/Footer'

const App = () => (
  <Container disableGutters>
    <Header />
    <Toolbar />
    <Profile />
    <Footer />
  </Container>
)

export default App
