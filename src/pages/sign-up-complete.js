import { useMemo } from 'react'

import { useAuth } from 'contexts/auth'
import { useUser } from 'contexts/user'
import FullPageLayout from 'layouts/FullPageLayout'
import EditProfileModal from 'components/modals/EditProfileModal'

const SignUpCompletePage = () => {
  const { authUser, navigateAfterSign } = useAuth()
  const { mapUserFromAuthUser } = useUser()
  const user = useMemo(() => mapUserFromAuthUser(authUser), [authUser])

  return (
    <FullPageLayout>
      <EditProfileModal
        user={user}
        completeProfile
        handleClose={navigateAfterSign}
      />
    </FullPageLayout>
  )
}

export default SignUpCompletePage
