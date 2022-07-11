import React, { useContext } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'

import { AuthContext } from 'contexts/auth'

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup
    .string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
})

const SignInForm = () => {
  const { signIn } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema,
    onSubmit: async ({ email, password }) => await signIn(email, password),
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ py: 2 }}>
      <TextField
        name="email"
        label="Email Address"
        autoComplete="email"
        {...formik.getFieldProps('email')}
        error={!!(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        disabled={formik.isSubmitting}
        margin="normal"
        autoFocus
        fullWidth
        required
      />

      <TextField
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        {...formik.getFieldProps('password')}
        error={!!(formik.touched.password && formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        disabled={formik.isSubmitting}
        margin="normal"
        fullWidth
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            name="remember"
            {...formik.getFieldProps('remember')}
            disabled={formik.isSubmitting}
            color="primary"
          />
        }
        label="Remember me"
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={formik.isSubmitting}>
        Sign In
      </Button>
    </Box>
  )
}

export default SignInForm
