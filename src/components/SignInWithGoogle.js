import React from 'react'
import Button from '@mui/material/Button'

import { signInWithGooglePopup } from 'utils/firebase'

const SignInWithGoogle = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    console.log(response)
  }

  return (
    <Button variant="contained" onClick={logGoogleUser} fullWidth>
      Google sign in
    </Button>
  )
}

export default SignInWithGoogle
