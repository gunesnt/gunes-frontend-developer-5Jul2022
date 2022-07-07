import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import PageLayout from 'components/PageLayout'
import WorkExperience from './WorkExperience'
import { Typography } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('name is required'),
  age: yup.number('Enter your age'),
})
const Input = styled('input')({
  display: 'none',
})

const Profile = () => {
  const formik = useFormik({
    initialValues: {
      name: 'Gunes Nermin Tokul',
      age: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <PageLayout
      header={
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" type="file" />

              <IconButton variant="contained" component="span" size="large">
                <Avatar sx={{ width: 56, height: 56 }}>C</Avatar>
              </IconButton>
            </label>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Typography>Gunes Nermin Tokul</Typography>
              <Typography>25</Typography>
            </Box>
          </Box>
        </>
      }>
      <Box
        disableGutters
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 5, width: '50ch' },
          '& .MuiBox-root': { ml: '30px', mr: '30px' },
        }}
        noValidate
        autoComplete="off">
        <div>
          <TextField
            id="standard-read-only-input"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="standard"
          />
          <TextField
            id="standard-read-only-input"
            label="Age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant="standard"
          />
          <div>
            <WorkExperience />
          </div>
        </div>
      </Box>
    </PageLayout>
  )
}

export default Profile
