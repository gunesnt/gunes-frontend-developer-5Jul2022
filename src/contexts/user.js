import { createContext, useContext, useState } from 'react'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'

import { db } from 'utils/firebase'

const USER = {
  id: 0,
  name: '',
  photoUrl: '',
  jobTitle: '',
  birthday: '',
}

export const UserContext = createContext(USER)
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(USER)

  const fetchUser = async (uid) => {
    const ref = doc(db, 'users', uid)
    const snapshot = await getDoc(ref)
    if (snapshot.exists()) setUser(snapshot.data())
  }

  const createUser = async (authUser, data = {}) => {
    const ref = doc(db, 'users', authUser.uid)
    const snapshot = await getDoc(ref)

    if (!snapshot.exists()) {
      const { displayName: name, email, photoURL } = authUser
      const createdAt = Timestamp.fromDate(new Date())
      const newUser = { name, email, photoURL, createdAt, ...data }

      try {
        await setDoc(ref, newUser)
        setUser(newUser)
      } catch (error) {
        console.log('error creating the user', error.message)
      }
    }
  }

  const updateUser = async (uid, data) => {
    const ref = doc(db, 'users', uid)

    try {
      await setDoc(ref, data)
      setUser(data)
    } catch (error) {
      console.log('error updating the user', error.message)
    }
  }

  return (
    <UserContext.Provider value={{ user, fetchUser, createUser, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}
