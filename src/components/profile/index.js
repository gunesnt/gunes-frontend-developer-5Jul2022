import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'

import PageLayout from 'components/PageLayout'
import EditProfile from 'components/Modal/EditProfile'
import ExperienceList from 'components/ExperienceList'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Input = styled('input')({
  display: 'none',
})

const Profile = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

            <IconButton aria-label="edit" component="span" onClick={handleOpen}>
              <EditIcon />
            </IconButton>

            <EditProfile open={open} handleClose={handleClose} />
          </Box>
        </>
      }>
      <ExperienceList />
    </PageLayout>
  )
}

export default Profile
