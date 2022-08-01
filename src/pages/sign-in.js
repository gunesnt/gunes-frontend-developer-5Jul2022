import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { SIGN_UP_PATH } from 'constants'
import FullPageLayout from 'layouts/FullPageLayout'
import Section from 'components/Section'
import SignInForm from 'components/SignInForm'

const SignInPage = () => (
  <FullPageLayout>
    <Section maxWidth={400}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          m: 2,
        }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <SignInForm />

        <Grid container justifyContent="flex-end" sx={{ mt: -1 }}>
          <Grid item>
            <Typography variant="body2">
              Don't have an account? <Link to={SIGN_UP_PATH}>Sign up</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Section>
  </FullPageLayout>
)

export default SignInPage
