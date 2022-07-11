import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Button from '@mui/material/Button'

import FullPageLayout from 'layouts/FullPageLayout'
import Section from 'components/Section'
import SignInForm from 'components/SignInForm'
import SignInWithGoogle from 'components/SignInWithGoogle'

const SignInPage = () => (
  <FullPageLayout>
    <Section maxWidth={500}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          m: 5,
        }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <SignInForm />

        <SignInWithGoogle />

        <Grid container>
          <Grid item>
            <Button component={Link} to="/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Section>
  </FullPageLayout>
)

export default SignInPage