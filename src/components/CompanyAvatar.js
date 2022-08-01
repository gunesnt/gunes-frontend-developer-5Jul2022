import Avatar from '@mui/material/Avatar'
import BusinessIcon from '@mui/icons-material/Business'
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone'

const CompanyAvatar = ({ src, alt, large, sx = {} }) => {
  const size = large ? 40 : 20

  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        width: size,
        height: size,
        color: 'text.disabled',
        backgroundColor: 'transparent',
        '.MuiAvatar-img': { objectFit: 'contain' },
        ...sx,
      }}
      variant="square">
      {large ? (
        <BusinessTwoToneIcon fontSize="large" />
      ) : (
        <BusinessIcon fontSize="small" />
      )}
    </Avatar>
  )
}

export default CompanyAvatar
