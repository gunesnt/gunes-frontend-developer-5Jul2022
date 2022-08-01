import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'

import { useModal } from 'utils/hooks'
import { useAuth } from 'contexts/auth'
import { useUser } from 'contexts/user'
import { ExperienceProvider } from 'contexts/experience'
import PageLayout from 'layouts/PageLayout'
import EditProfileModal from 'components/modals/EditProfileModal'
import ExperienceList from 'components/ExperienceList'
import UserList from 'components/UserList'
import AvatarButton from 'components/AvatarButton'

const ProfilePage = () => {
  const { authUser } = useAuth()
  const { user, fetchUser } = useUser()
  const [modalOpen, handleModalOpen, handleModalClose] = useModal(false)

  useEffect(() => {
    if (authUser?.uid) fetchUser(authUser.uid)
  }, [authUser?.uid])

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
          <AvatarButton
            src={user?.photoThumbURL}
            width="15vmax"
            height="15vmax"
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },
            }}>
            <Typography variant="h5" fontSize="4vmax">
              {user?.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body1"
                fontSize="2vmax"
                sx={{ display: 'flex', gap: 1, opacity: 0.9 }}>
                <span title="Current Job">{user?.jobTitle}</span>
                {'-'}
                <span title="Age">25</span>
              </Typography>
              <IconButton
                onClick={handleModalOpen}
                size="small"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
          {user?.email && (
            <EditProfileModal
              user={user}
              open={modalOpen}
              handleClose={handleModalClose}
            />
          )}
        </Box>
      }>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          {!user?.uid ? null : (
            <ExperienceProvider>
              <ExperienceList />
            </ExperienceProvider>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <UserList />
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default ProfilePage
