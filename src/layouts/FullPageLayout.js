import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

import Header from 'components/Header'
import Footer from 'components/Footer'

const FullPageLayout = ({ bgcolor = 'primary.main', children }) => (
  <Container
    maxWidth={false}
    disableGutters
    sx={{
      bgcolor,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      gap: 10,
    }}>
    <Header />

    <Toolbar />

    <Container>{children}</Container>

    <Footer />
  </Container>
)

export default FullPageLayout
