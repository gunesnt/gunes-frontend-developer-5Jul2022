import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AdbIcon from '@mui/icons-material/Adb'
import Button from '@mui/material/Button'

import ElevationScroll from 'components/ElevationScroll'
import { Link, Outlet } from 'react-router-dom'

const Header = (props) => (
  <ElevationScroll {...props}>
    <AppBar>
      <Container maxWidth="xl">
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

          <Box sx={{ flexGrow: 0 }}>
            <Button
              sx={{ color: 'inherit' }}
              component={Link}
              to="/sign-in"
              variant="contained">
              Sign In
            </Button>
            {/* <Link to="/sign-in">Sign In</Link> */}
          </Box>
          <Outlet />
        </Toolbar>
      </Container>
    </AppBar>
  </ElevationScroll>
)

export default Header
