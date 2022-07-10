import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup
    .string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
})

const SignInForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
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
        margin="normal"
        fullWidth
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            name="remember"
            {...formik.getFieldProps('remember')}
            color="primary"
          />
        }
        label="Remember me"
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  )
}

export default SignInForm
