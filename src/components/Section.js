import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const Section = ({
  title,
  maxWidth,
  titleFontSize,
  action,
  sx = {},
  children,
}) => (
  <Paper
    elevation={3}
    sx={{ px: 3, py: 2.5, maxWidth, margin: '0 auto', ...sx }}>
    {title && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontSize={titleFontSize} gutterBottom>
          {title}
        </Typography>

        {action && <Box sx={{ mt: -0.6, mr: -0.6 }}>{action}</Box>}
      </Box>
    )}

    {children}
  </Paper>
)

export default Section
