import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { useMenu, useModal } from 'utils/hooks'
import { useExperience } from 'contexts/experience'
import EditExperienceModal from 'components/modals/EditExperienceModal'
import AlertModal from 'components/modals/AlertModal'

const ExperienceItemMenu = ({ item }) => {
  const { deleteExp } = useExperience()
  const [editOpen, handleEditOpen, handleEditClose] = useModal()
  const [deleteOpen, handleDeleteOpen, handleDeleteClose] = useModal()
  const [menuOpen, menuAnchorEl, handleOpenMenu, handleCloseMenu] = useMenu()

  const handleDeleteConfirm = async () => {
    await deleteExp(item.id)
    handleDeleteClose()
  }

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
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{ 'aria-labelledby': 'exp-menu-button' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { minWidth: 150 } }}>
        <MenuItem dense onClick={handleEditOpen}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem dense onClick={handleDeleteOpen}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {editOpen && (
        <EditExperienceModal
          experience={item}
          open={editOpen}
          handleClose={handleEditClose}
        />
      )}

      <AlertModal
        open={deleteOpen}
        title="Confirm Delete"
        description="When you delete this experience, you can't take back."
        confirmText="Delete"
        handleClose={handleDeleteClose}
        handleConfirm={handleDeleteConfirm}
      />
    </>
  )
}

export default ExperienceItemMenu
