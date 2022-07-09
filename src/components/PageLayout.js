import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

const PageLayout = ({ header, children }) => (
  <>
    <Box
      sx={{
        height: '60vh',
        minHeight: 200,
        maxHeight: 350,
        bgcolor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        pb: '10vh',
      }}>
      {header}
    </Box>

    <Container maxWidth="md" sx={{ mt: '-10vh' }}>
      {children}
    </Container>
  </>
)

export default PageLayout
