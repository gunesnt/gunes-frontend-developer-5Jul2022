import React from 'react'
import List from '@mui/material/List'

import Section from 'components/Section'
import UserItem from 'components/UserItem'
import { users } from 'mockData'

const UserList = () => (
  <Section
    title="People you may know"
    titleFontSize="medium"
    sx={{
      px: { xs: 1, sm: 3 },
      py: { xs: 1, sm: 2.5 },
      boxShadow: { xs: 0, sm: 3 },
    }}>
    <List
      dense
      sx={{
        width: '100%',
        display: { xs: 'grid', sm: 'block' },
        gridTemplateColumns: '50% 50%',
      }}>
      {users.slice(0, 6).map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </List>
  </Section>
)

export default UserList
