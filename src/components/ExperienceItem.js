import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone'

import { formatDate } from 'utils/date'
import ExperienceItemMenu from 'components/ExperienceItemMenu'
import EditExperienceModal from 'components/modals/EditExperienceModal'
import AlertModal from 'components/modals/AlertModal'

const ExperienceItem = ({ item }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleEditOpen = () => setEditOpen(true)
  const handleEditClose = () => setEditOpen(false)

  const handleDeleteOpen = () => setDeleteOpen(true)
  const handleDeleteClose = () => setDeleteOpen(false)

  return (
    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
      <ListItemAvatar>
        <Avatar
          src={item.companyLogo}
          alt={item.company}
          sx={{ bgcolor: 'transparent', color: 'text.secondary' }}
          variant="square">
          <BusinessTwoToneIcon fontSize="large" />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography>{item.jobTitle}</Typography>

            <ExperienceItemMenu
              handleEditClick={handleEditOpen}
              handleDeleteClick={handleDeleteOpen}
            />
            <EditExperienceModal
              open={editOpen}
              handleClose={handleEditClose}
            />
            <AlertModal
              open={deleteOpen}
              title="Confirm Delete"
              description="When you delete this experience, you can't take back."
              confirmText="Delete"
              handleClose={handleDeleteClose}
              handleConfirm={handleDeleteClose}
            />
          </Box>
        }
        secondary={
          <>
            <Typography variant="caption" display="block">
              {item.company}
              {' — '}
              {formatDate(item.startDate)}
              {' - '}
              {formatDate(item.endDate) || 'Present'}
            </Typography>

            <Typography variant="caption" color="text.primary">
              {item.jobDescription}
            </Typography>
          </>
        }
      />
    </ListItem>
  )
}

export default ExperienceItem
