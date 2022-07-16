import { createContext, useContext, useState } from 'react'
import { doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'

import { db, uploadFile } from 'utils/firebase'

const USER = {
  uid: '',
  name: '',
  photoURL: '',
  photoThumbURL: '',
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
      const { uid, displayName: name, email, photoURL } = authUser
      const createdAt = Timestamp.fromDate(new Date())
      const newUser = {
        ...USER,
        uid,
        name,
        email,
        photoURL,
        photoThumbURL: photoURL,
        createdAt,
        ...data,
      }

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
      await updateDoc(ref, data)
      setUser({ ...user, ...data })
    } catch (error) {
      console.log('error updating the user', error.message)
    }
  }

  const uploadProfilePhoto = async (file, thumbFile) => {
    const path = `user/${user.uid}/profile-photo.png`
    const thumbPath = `user/${user.uid}/profile-photo-thumb.png`
    let urls

    try {
      urls = await Promise.all([
        uploadFile(file, path),
        uploadFile(thumbFile, thumbPath),
      ])
    } catch (error) {
      console.log('error uploading photo:', error.message)
    }

    const [photoURL, photoThumbURL] = urls

    setUser((currentUser) => ({ ...currentUser, photoURL, photoThumbURL }))
    return [photoURL, photoThumbURL]
  }

  return (
    <UserContext.Provider
      value={{ user, fetchUser, createUser, updateUser, uploadProfilePhoto }}>
      {children}
    </UserContext.Provider>
  )
}
