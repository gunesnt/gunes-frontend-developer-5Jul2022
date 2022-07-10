import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ExperienceItemMenu = ({ handleEditClick, handleDeleteClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuOpen = Boolean(anchorEl)

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget)
  const handleCloseMenu = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        id="exp-menu-button"
        aria-controls={menuOpen ? 'exp-item-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        onClick={handleOpenMenu}
        color="inherit"
        size="small">
        <MoreVertIcon fontSize="inherit" />
      </IconButton>

      <Menu
        id="exp-item-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{ 'aria-labelledby': 'exp-menu-button' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { minWidth: 150 } }}>
        <MenuItem dense onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem dense onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default ExperienceItemMenu
