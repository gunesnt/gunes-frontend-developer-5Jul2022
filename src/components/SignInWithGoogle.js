import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import { AuthContext } from 'contexts/auth'

const SignInWithGoogle = () => {
  const { GoogleSignIn } = useContext(AuthContext)

  return (
    <Button variant="contained" onClick={GoogleSignIn} fullWidth>
      Google sign in
    </Button>
  )
}

export default SignInWithGoogle
