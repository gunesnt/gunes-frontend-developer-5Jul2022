import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

const PageLayout = ({ header, children }) => (
  <>
    <Box
      sx={{
        height: 300,
        bgcolor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pb: 16,
        color: 'white',
      }}>
      {header}
    </Box>

    <Container>
      <Paper elevation={0} sx={{ mt: -15, borderRadius: 3 }}>
        {children}
      </Paper>
    </Container>
  </>
)

export default PageLayout
