import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

const UserItem = ({ user }) => (
  <ListItem dense alignItems="flex-start" sx={{ px: 0 }}>
    <ListItemAvatar sx={{ minWidth: 46 }}>
      <Avatar
        src={user.image}
        alt={user.companyName}
        sx={{ width: 32, height: 32 }}
      />
    </ListItemAvatar>

    <ListItemText
      primary={user.fullName}
      secondary={user.jobTitle}
      secondaryTypographyProps={{ fontSize: 12 }}
      sx={{ my: 0.5 }}
    />
  </ListItem>
)

export default UserItem
