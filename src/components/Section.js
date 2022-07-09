import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const Section = ({ title, children }) => (
  <Paper elevation={5} sx={{ px: 3, py: 2.5 }}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>

    {children}
  </Paper>
)

export default Section
