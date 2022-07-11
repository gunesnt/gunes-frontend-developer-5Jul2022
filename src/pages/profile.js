import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'

import PageLayout from 'layouts/PageLayout'
import EditProfileModal from 'components/modals/EditProfileModal'
import ExperienceList from 'components/ExperienceList'
import UserList from 'components/UserList'

const Input = styled('input')({
  display: 'none',
})

const ProfilePage = () => {
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

            <EditProfileModal open={open} handleClose={handleClose} />
          </Box>
        </>
      }>
      <Grid container spacing={3}>
        <Grid item sm={8}>
          <ExperienceList />
        </Grid>
        <Grid item sm={4}>
          <UserList />
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default ProfilePage