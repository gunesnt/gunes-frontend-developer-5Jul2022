import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import FullPageLayout from 'layouts/FullPageLayout'
import Section from 'components/Section'
import SignUpForm from 'components/SignUpForm'

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
          Sign up
        </Typography>

        <SignUpForm />
      </Box>
    </Section>
  </FullPageLayout>
)

export default SignInPage
