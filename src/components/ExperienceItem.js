import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'

import EditExperienceModal from 'components/modals/EditExperienceModal'

const ExperienceItem = ({ item }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <ListItem
      alignItems="flex-start"
      secondaryAction={
        <>
          <IconButton size="small" onClick={handleOpen}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <EditExperienceModal open={open} handleClose={handleClose} />
        </>
      }>
      <ListItemAvatar>
        <Avatar src={item.companyLogo} alt={item.company} />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              pr: 3,
            }}>
            <Typography>{item.jobTitle}</Typography>
            <Typography variant="caption" color="text.secondary">
              {item.startDate}
              {' — '}
              {item.endDate || 'Present'}
            </Typography>
          </Box>
        }
        secondary={
          <>
            <Typography variant="caption" display="block">
              {item.company}
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
