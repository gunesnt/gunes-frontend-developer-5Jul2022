import React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

import Header from 'components/Header'
import Footer from 'components/Footer'

const PageLayout = ({ header, headerBgcolor = 'primary.main', children }) => (
  <Container
    maxWidth={false}
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
    disableGutters>
    <Header />

    <Box
      sx={{
        bgcolor: headerBgcolor,
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        pb: '10vh',
      }}>
      <Toolbar />

      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: '7vmin',
        }}>
        {header}
      </Container>
    </Box>

    <Container maxWidth="md" sx={{ mt: '-10vh' }}>
      {children}
    </Container>

    <Footer sx={{ mt: 'auto' }} />
  </Container>
)

export default PageLayout
