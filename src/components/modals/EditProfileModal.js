import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('name is required'),
  age: yup.number('Enter your age'),
})

const EditProfileModal = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      name: 'Gunes Nermin Tokul',
      age: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      handleClose()
    },
  })

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Profile</DialogTitle>
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
        <DialogContent>
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default EditProfileModal
