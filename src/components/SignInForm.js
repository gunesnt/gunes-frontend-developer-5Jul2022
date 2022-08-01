import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'

import { useAuth } from 'contexts/auth'
import { useFormikErrors } from 'utils/hooks'
import SignInWithGoogle from 'components/SignInWithGoogle'
import PasswordField from 'components/fields/PasswordField'

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup
    .string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
})

const SignInForm = () => {
  const { signIn } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema,
    onSubmit: async ({ email, password, remember }) =>
      await signIn(email, password, remember),
  })

  const formikErrors = useFormikErrors(formik)

  return (
    <Box>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          name="email"
          label="Email Address"
          autoComplete="email"
          {...formik.getFieldProps('email')}
          error={!!formikErrors.email}
          helperText={formikErrors.email}
          disabled={formik.isSubmitting}
          margin="normal"
          autoFocus
          fullWidth
          required
        />

        <PasswordField
          name="password"
          label="Password"
          autoComplete="current-password"
          {...formik.getFieldProps('password')}
          error={!!formikErrors.password}
          helperText={formikErrors.password}
          disabled={formik.isSubmitting}
          margin="normal"
          fullWidth
          required
        />

        <FormControlLabel
          label="Remember me"
          control={
            <Checkbox
              name="remember"
              {...formik.getFieldProps('remember')}
              disabled={formik.isSubmitting}
              color="primary"
            />
          }
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
          sx={{ mt: 3 }}>
          Sign In
        </Button>
      </Box>
      <Divider variant="middle" sx={{ my: 2.5 }} />
      <SignInWithGoogle />
    </Box>
  )
}

export default SignInForm
