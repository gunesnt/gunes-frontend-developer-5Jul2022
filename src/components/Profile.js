import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Profile() {
  return (
    <Box
      disableGutters
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 5, width: '50ch' },
        '& .MuiBox-root': { ml: '30px', mr: '30px' },
      }}
      noValidate
      autoComplete="off">
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid sx={{ zIndex: -100 }} item xs={4}>
              <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5">Gunes Nermin Tokul</Typography>
            </Grid>
          </Grid>
        </Box>

        <TextField
          id="standard-read-only-input"
          label="Name"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Age"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5" gutterBottom component="div">
                Work Experience
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <TextField
          id="standard-read-only-input"
          label="Start Date"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="End Date"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Job Title"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Company"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Company Logo"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Job Description"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
      </div>
    </Box>
  )
}
