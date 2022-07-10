import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const Footer = ({ sx = {} }) => (
  <Typography
    component="div"
    variant="body2"
    color="text.secondary"
    align="center"
    sx={{ p: 4, ...sx }}>
    {'Copyright © '}
    <Link
      color="inherit"
      href="https://github.com/gunesnt"
      target="_blank"
      title="Gunes's Profile">
      Gunes
    </Link>{' '}
    {new Date().getFullYear()}
  </Typography>
)

export default Footer
