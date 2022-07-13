import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          textShadow: '0 0 1px white',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
  palette: {
    primary: {
      main: '#35baf6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
