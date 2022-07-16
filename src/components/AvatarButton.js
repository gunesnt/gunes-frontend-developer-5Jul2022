import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'

const AvatarButton = ({ src, width = 128, height = 128, edit, onClick }) => (
  <IconButton
    variant="contained"
    component="span"
    size="large"
    sx={
      edit && {
        ':hover .MuiAvatar-root': { position: 'relative' },
        ':hover .MuiAvatar-root:before': {
          content: '"Update"',
          position: 'absolute',
          background: 'rgba(0,0,0,0.3)',
          width: '100%',
          height: '100%',
          display: 'grid',
          placeContent: 'center',
          borderRadius: '100%',
          color: 'white',
        },
      }
    }
    onClick={onClick}>
    <Avatar src={src} sx={{ width, height }} />
  </IconButton>
)

export default AvatarButton
