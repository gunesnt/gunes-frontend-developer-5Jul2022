import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useAuth } from 'contexts/auth'
import { Divider } from '@mui/material'

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup
    .string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
  name: yup.string().required('Required'),
  jobTitle: yup.string().required('Required'),
  birthday: yup.number().required('Required'),
})

const SignUpForm = () => {
  const { signUp } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      jobTitle: '',
      birthday: '',
    },
    validationSchema,
    onSubmit: async ({ email, password, name, jobTitle, birthday }) =>
      await signUp(email, password, { name, jobTitle, birthday }),
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="password"
            type="password"
            label="Password"
            autoComplete="new-password"
            {...formik.getFieldProps('password')}
            error={!!(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            fullWidth
            required
          />
        </Grid>
      </Grid>

      <Divider />

      <TextField
        name="name"
        label="Full Name"
        autoComplete="name"
        {...formik.getFieldProps('name')}
        error={!!(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        margin="normal"
        fullWidth
        required
      />

      <TextField
        name="job-title"
        label="Job Title"
        autoComplete="job-title"
        {...formik.getFieldProps('jobTitle')}
        error={!!(formik.touched.jobTitle && formik.errors.jobTitle)}
        helperText={formik.touched.jobTitle && formik.errors.jobTitle}
        margin="normal"
        fullWidth
        required
      />

      <TextField
        name="birthday"
        label="Birthday"
        autoComplete="bday"
        {...formik.getFieldProps('birthday')}
        error={!!(formik.touched.birthday && formik.errors.birthday)}
        helperText={formik.touched.birthday && formik.errors.birthday}
        margin="normal"
        fullWidth
        required
      />

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        Sign up
      </Button>
    </Box>
  )
}

export default SignUpForm
