import dayjs from 'dayjs'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Timestamp } from 'firebase/firestore'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import { DatePicker } from '@mui/x-date-pickers'

import { useExperience } from 'contexts/experience'
import { useFormikErrors } from 'utils/hooks'
import CompanyAutocomplete from 'components/fields/CompanyAutocomplete'

const validationSchema = yup.object({
  company: yup.object().nullable().required('Required'),
  jobTitle: yup.string().required('Required'),
  description: yup.string(),
  isCurrent: yup.bool().nullable(),
  startDate: yup.date().nullable().required('Required'),
  endDate: yup
    .date()
    .nullable()
    .when('isCurrent', {
      is: false,
      then: (schema) => schema.required('Required'),
    }),
})

const EditExperienceModal = ({ experience, open, handleClose }) => {
  const { createExp, updateExp } = useExperience()

  const onSubmit = async ({ startDate, endDate, isCurrent, ...values }) => {
    const data = {
      ...values,
      startDate: Timestamp.fromDate(dayjs(startDate).toDate()),
      endDate: isCurrent ? null : Timestamp.fromDate(dayjs(endDate).toDate()),
      isCurrent,
    }

    if (experience) {
      await updateExp(experience.id, data)
    } else {
      await createExp(data)
    }

    handleClose()
  }

  const formik = useFormik({
    initialValues: {
      jobTitle: experience?.jobTitle || '',
      company: experience?.company || null,
      startDate: experience?.startDate?.toDate
        ? dayjs(experience.startDate.toDate())
        : null,
      endDate: experience?.endDate?.toDate
        ? dayjs(experience.endDate.toDate())
        : null,
      isCurrent: experience?.isCurrent || false,
      description: experience?.description || '',
    },
    validationSchema,
    onSubmit,
  })

  const formikErrors = useFormikErrors(formik)

  return (
    <Dialog maxWidth="xs" scroll="body" open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle>{experience ? 'Edit' : 'New'} Experience</DialogTitle>
        <DialogContent>
          <CompanyAutocomplete
            value={formik.values.company}
            onChange={(newCompany) => {
              formik.setFieldTouched('company', true)
              formik.setFieldValue('company', newCompany)
            }}
            error={!!formikErrors.company}
            helperText={formikErrors.company}
          />

          <TextField
            name="jobTitle"
            label="Job Title"
            autoComplete="job-title"
            {...formik.getFieldProps('jobTitle')}
            error={!!formikErrors.jobTitle}
            helperText={formikErrors.jobTitle}
            disabled={formik.isSubmitting}
            margin="normal"
            fullWidth
            required
          />

          <TextField
            name="description"
            label="Description"
            {...formik.getFieldProps('description')}
            error={!!formikErrors.description}
            helperText={formikErrors.description}
            disabled={formik.isSubmitting}
            margin="normal"
            multiline
            minRows={3}
            maxRows={10}
            fullWidth
          />

          <FormControlLabel
            label="I am currently working in this role"
            sx={{ mt: 1, mb: -0.5 }}
            control={
              <Checkbox
                name="isCurrent"
                checked={formik.values.isCurrent}
                onChange={(e) => {
                  formik.setFieldTouched('isCurrent', true)
                  formik.setFieldValue('isCurrent', e.target.checked)
                }}
                disabled={formik.isSubmitting}
              />
            }
          />

          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <DatePicker
                name="startDate"
                label="Start Date"
                value={formik.values.startDate}
                onChange={(value) => {
                  formik.setFieldTouched('startDate', true)
                  formik.setFieldValue('startDate', value)
                }}
                openTo="year"
                views={['year', 'month']}
                disableFuture
                disabled={formik.isSubmitting}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!formikErrors.startDate}
                    helperText={formikErrors.startDate}
                    margin="normal"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                name="endDate"
                label="End Date"
                value={formik.values.endDate}
                onChange={(value) => {
                  formik.setFieldTouched('endDate', true)
                  formik.setFieldValue('endDate', value)
                }}
                openTo="year"
                views={['year', 'month']}
                disableFuture
                disableMaskedInput
                disabled={formik.values.isCurrent || formik.isSubmitting}
                minDate={formik.values.startDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!formikErrors.endDate}
                    helperText={formikErrors.endDate}
                    margin="normal"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'primary.main' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{ color: 'primary.main' }}
            disabled={formik.isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditExperienceModal
