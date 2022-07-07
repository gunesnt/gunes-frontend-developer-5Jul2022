import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const WorkExperience = () => {
  return (
    <div>
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
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="End Date"
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="Job Title"
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="Company"
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="Company Logo"
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="Job Description"
        variant="standard"
      />
    </div>
  )
}

export default WorkExperience
