import React from 'react'
import List from '@mui/material/List'

import Section from 'components/Section'
import UserItem from 'components/UserItem'
import { users } from 'mockData'

const UserList = () => (
  <Section title="People you may know" titleFontSize="medium">
    <List dense>
      {users.slice(0, 6).map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </List>
  </Section>
)

export default UserList
