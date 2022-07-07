import * as React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

import WorkExperience from './WorkExperience'

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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid sx={{ zIndex: -100 }} item xs={4}>
              <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} />
            </Grid>
          </Grid>
        </Box>

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
  )
}

export default Profile
