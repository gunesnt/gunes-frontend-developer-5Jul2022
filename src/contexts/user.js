import { createContext, useContext, useEffect, useState, useRef } from 'react'
import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore'

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
  const unsubscribeListener = useRef()

  useEffect(() => {
    return () => {
      unsubscribeListener.current?.()
    }
  }, [])

  const hasUser = async (uid) => {
    const ref = doc(db, 'users', uid)
    const snap = await getDoc(ref)
    return snap.exists()
  }

  const fetchUser = async (uid) => {
    const ref = doc(db, 'users', uid)
    unsubscribeListener.current?.()
    unsubscribeListener.current = onSnapshot(ref, (snap) => {
      if (!snap.exists()) setUser(USER)
      setUser(snap.data())
    })
  }

  const mapUserFromAuthUser = (authUser) => {
    const { uid, displayName: name, email, photoURL } = authUser
    return {
      ...USER,
      uid,
      name,
      email,
      photoURL,
      photoThumbURL: photoURL,
    }
  }

  const createUser = async (uid, data = {}) => {
    const ref = doc(db, 'users', uid)
    const createdAt = Timestamp.fromDate(new Date())
    const newUser = { ...data, createdAt }

    try {
      await setDoc(ref, newUser)
      setUser(newUser)
    } catch (error) {
      console.log('error creating the user', error.message)
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

  const uploadProfilePhoto = async (uid, file, thumbFile) => {
    const path = `user/${uid}/profile-photo.png`
    const thumbPath = `user/${uid}/profile-photo-thumb.png`
    let urls

    try {
      urls = await Promise.all([
        uploadFile(file, path),
        uploadFile(thumbFile, thumbPath),
      ])
    } catch (error) {
      console.log('error uploading photo:', error.message)
    }

    return urls
  }

  return (
    <UserContext.Provider
      value={{
        user,
        hasUser,
        fetchUser,
        createUser,
        updateUser,
        uploadProfilePhoto,
        mapUserFromAuthUser,
      }}>
      {children}
    </UserContext.Provider>
  )
}
