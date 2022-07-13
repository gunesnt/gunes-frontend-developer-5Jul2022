import React, { useState } from 'react'
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

const ProfilePage = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <PageLayout
      header={
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            gap: 1,
          }}>
          <IconButton variant="contained" component="span" size="large">
            <Avatar
              src="https://randomuser.me/api/portraits/women/30.jpg"
              sx={{ width: '15vmax', height: '15vmax' }}
            />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },
            }}>
            <Typography variant="h5" fontSize="4vmax">
              Gunes Nermin Tokul
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body1"
                fontSize="2vmax"
                sx={{ display: 'flex', gap: 1, opacity: 0.9 }}>
                <span title="Current Job">Frontend Developer</span>
                {'-'}
                <span title="Age">25</span>
              </Typography>
              <IconButton
                onClick={handleOpen}
                size="small"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>

          <EditProfileModal open={open} handleClose={handleClose} />
        </Box>
      }>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <ExperienceList />
        </Grid>
        <Grid item xs={12} sm={4}>
          <UserList />
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default ProfilePage
