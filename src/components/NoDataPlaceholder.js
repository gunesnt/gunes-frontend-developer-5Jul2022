import React from 'react'
import Box from '@mui/material/Box'

const NoDataPlaceholder = ({ message, IconComp }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'text.disabled',
      gap: 2,
      p: 10,
    }}>
    {IconComp && (
      <IconComp sx={{ width: '10vmin', height: '10vmin', opacity: 0.7 }} />
    )}
    {message || 'No data found!'}
  </Box>
)

export default NoDataPlaceholder
