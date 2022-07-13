import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AdbIcon from '@mui/icons-material/Adb'
import Button from '@mui/material/Button'
import { alpha } from '@mui/material'

import { useAuth } from 'contexts/auth'
import ElevationScroll from 'components/ElevationScroll'

const Header = (props) => {
  const { fetched, isAuthenticated, signOut } = useAuth()
  const location = useLocation()

  return (
    <ElevationScroll {...props}>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.5),
          backdropFilter: 'blur(20px)',
        }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ color: 'white' }}>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              LOGO
            </Typography>

            {location.pathname !== '/sign-in' && !!fetched && (
              <Box sx={{ flexGrow: 0 }}>
                {isAuthenticated ? (
                  <Button variant="text" color="inherit" onClick={signOut}>
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to="/sign-in"
                    variant="text"
                    color="inherit">
                    Sign In
                  </Button>
                )}
              </Box>
            )}
            <Outlet />
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  )
}

export default Header
