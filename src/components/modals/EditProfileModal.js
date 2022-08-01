import React from 'react'
import dayjs from 'dayjs'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Timestamp } from 'firebase/firestore'

import { MAX_LEGAL_DATE, LEGAL_AGE } from 'constants'
import { useFormikErrors, useOr } from 'utils/hooks'
import { useUser } from 'contexts/user'
import { useImageCompress } from 'utils/image'
import AvatarUploadButton from 'components/AvatarUploadButton'

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  jobTitle: yup.string().required('Required'),
  birthday: yup
    .date()
    .required('Required')
    .max(
      MAX_LEGAL_DATE.toDate(),
      `You must be equal or older than ${LEGAL_AGE}.`,
    ),
})

const EditProfileModal = ({ user, open, handleClose, completeProfile }) => {
  const { uploadProfilePhoto, createUser, updateUser } = useUser()
  const { file, thumbFile, thumbBlob, updateFile } = useImageCompress(1024, 256)
  const photoThumbURL = useOr([thumbBlob, user.photoThumbURL, user.photoURL])
  const alwaysOpen = completeProfile

  const onSubmit = async (values) => {
    values.birthday = Timestamp.fromDate(dayjs(values.birthday).toDate())

    if (file && thumbFile) {
      const [url, thumbUrl] = await uploadProfilePhoto(
        user.uid,
        file,
        thumbFile,
      )
      values.photoURL = url
      values.photoThumbURL = thumbUrl
    }

    if (completeProfile) {
      await createUser(user.uid, { ...user, ...values })
    } else {
      await updateUser(user.uid, values)
    }

    handleClose()
  }

  const formik = useFormik({
    initialValues: {
      name: user.name || '',
      jobTitle: user.jobTitle || '',
      birthday: user.birthday?.toDate ? dayjs(user.birthday.toDate()) : null,
    },
    validationSchema,
    onSubmit,
  })

  const formikErrors = useFormikErrors(formik)

  return (
    <Dialog
      maxWidth="xs"
      scroll="body"
      open={alwaysOpen || open}
      hideBackdrop={alwaysOpen}
      onClose={alwaysOpen ? () => null : handleClose}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle>
          {completeProfile ? 'Complete' : 'Edit'} Profile
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" sx={{ mb: 3 }}>
            <AvatarUploadButton
              id="profile-photo"
              src={photoThumbURL}
              onChange={(e) =>
                e.target.files.length && updateFile(e.target.files[0])
              }
            />
          </Box>

          <TextField
            name="name"
            label="Full Name"
            autoComplete="name"
            {...formik.getFieldProps('name')}
            error={!!formikErrors.name}
            helperText={formikErrors.name}
            disabled={formik.isSubmitting}
            margin="normal"
            fullWidth
            required
          />

          <TextField
            name="email"
            label="Email"
            value={user.email}
            margin="normal"
            fullWidth
            disabled
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

          <DatePicker
            name="birthday"
            label="Birthday"
            value={formik.values.birthday}
            onChange={(value) => {
              formik.setFieldTouched('birthday', true)
              formik.setFieldValue('birthday', value)
            }}
            disabled={formik.isSubmitting}
            openTo="year"
            views={['year', 'month', 'day']}
            disableFuture
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!formikErrors.birthday}
                helperText={formikErrors.birthday}
                autoComplete="bday"
                margin="normal"
                fullWidth
                required
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          {!alwaysOpen && (
            <Button sx={{ color: 'primary.main' }} onClick={handleClose}>
              Cancel
            </Button>
          )}
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

export default EditProfileModal
