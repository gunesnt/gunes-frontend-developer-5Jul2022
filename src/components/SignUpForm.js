import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useAuth } from 'contexts/auth'
import { useFormikErrors } from 'utils/hooks'
import PasswordField from 'components/fields/PasswordField'

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup
    .string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Required'),
})

const SignUpForm = () => {
  const { signUp } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async ({ email, password }) => await signUp(email, password),
  })

  const formikErrors = useFormikErrors(formik)

  return (
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
        autoComplete="new-password"
        {...formik.getFieldProps('password')}
        error={!!formikErrors.password}
        helperText={formikErrors.password}
        disabled={formik.isSubmitting}
        margin="normal"
        fullWidth
        required
      />

      <PasswordField
        name="confirmPassword"
        label="Password"
        autoComplete="new-password"
        {...formik.getFieldProps('confirmPassword')}
        error={!!formikErrors.confirmPassword}
        helperText={formikErrors.confirmPassword}
        disabled={formik.isSubmitting}
        margin="normal"
        fullWidth
        required
      />

      <Typography
        component="div"
        color="text.secondary"
        variant="caption"
        sx={{ mt: 2 }}>
        *By clicking sign up, you agree to our{' '}
        <Link color="inherit" href="#">
          Terms
        </Link>
        .
      </Typography>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{ mt: 1 }}>
        Sign up
      </Button>
    </Box>
  )
}

export default SignUpForm
