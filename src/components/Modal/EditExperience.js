import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'

const validationSchema = yup.object({
  startDate: yup.number('Enter your startDate'),
  endDate: yup.number('Enter your endDate'),
  jobTitle: yup.string('Enter your jobTitle').required('jobTitle is required'),
  company: yup.string('Enter your company').required('company is required'),
  companyLogo: '',
  description: yup
    .string('Enter your description')
    .required('description is required'),
})

const EditExperience = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
      jobTitle: '',
      company: '',
      companyLogo: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      handleClose()
    },
  })

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Experience</DialogTitle>
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
              label="Start Date"
              variant="standard"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              helperText={formik.touched.startDate && formik.errors.startDate}
            />
            <TextField
              id="standard-read-only-input"
              label="End Date"
              variant="standard"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />
            <TextField
              id="standard-read-only-input"
              label="Job Title"
              variant="standard"
              name="jobTitle"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
              helperText={formik.touched.jobTitle && formik.errors.jobTitle}
            />
            <TextField
              id="standard-read-only-input"
              label="Company"
              variant="standard"
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
            />
            <TextField
              id="standard-read-only-input"
              label="Company Logo"
              variant="standard"
              name="companyLogo"
              value={formik.values.companyLogo}
              onChange={formik.handleChange}
              error={
                formik.touched.companyLogo && Boolean(formik.errors.companyLogo)
              }
              helperText={
                formik.touched.companyLogo && formik.errors.companyLogo
              }
            />
            <TextField
              id="standard-read-only-input"
              label="Job Description"
              variant="standard"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
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

export default EditExperience
