import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import useScrollTrigger from '@mui/material/useScrollTrigger'

import Header from './components/header/Header'
import Profile from './components/profile/Profile'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const ElevationScroll = (props) => {
  const { children, window } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const styles = {
  container: {
    height: 300,
    borderRadius: '0px',
    marginBottom: '30px',
    maxWith: '100px',
    backgroundColor: '#35baf6',
  },
}

export default function App(props) {
  return (
    <Container disableGutters>
      <ElevationScroll {...props}>
        <Header />
      </ElevationScroll>
      <Paper variant="outlined" style={styles.container} />

      <Profile />
      <Box sx={{ my: 4 }}>
        <Copyright />
      </Box>
    </Container>
  )
}
