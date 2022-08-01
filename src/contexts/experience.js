import React, { useState, useMemo, useRef, useEffect } from 'react'
import {
  query,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
} from 'firebase/firestore'

import { db } from 'utils/firebase'
import { useUser } from 'contexts/user'

const EXPERIENCE = {
  id: '',
  jobTitle: '',
  company: {
    name: '',
    domain: '',
    logo: '',
  },
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
}

export const ExperienceContext = React.createContext(EXPERIENCE)
export const useExperience = () => React.useContext(ExperienceContext)

export const ExperienceProvider = ({ children }) => {
  const { user } = useUser()
  const [experiences, setExperiences] = useState(null)
  const dbPath = useMemo(() => `users/${user.uid}/experiences`, [user.uid])
  const unsubscribeListener = useRef()

  useEffect(() => {
    return () => {
      unsubscribeListener.current()
    }
  }, [])

  const fetchExps = async () => {
    const q = query(collection(db, dbPath), orderBy('startDate', 'desc'))

    unsubscribeListener.current = onSnapshot(q, (snap) => {
      const exps = []

      snap.forEach((doc) => {
        exps.push({ id: doc.id, ...(doc.data() || {}) })
      })

      setExperiences(exps)
    })
  }

  const createExp = async (data) => {
    try {
      await addDoc(collection(db, dbPath), data)
    } catch (error) {
      console.log('error creating the experience', error.message)
    }
  }

  const updateExp = async (id, data) => {
    const expRef = doc(db, dbPath, id)
    try {
      await updateDoc(expRef, data)
    } catch (error) {
      console.log('error updating the experience', error.message)
    }
  }

  const deleteExp = async (id) => {
    const expRef = doc(db, dbPath, id)
    try {
      await deleteDoc(expRef)
    } catch (error) {
      console.log('error deleting the experience', error.message)
    }
  }

  return (
    <ExperienceContext.Provider
      value={{ experiences, fetchExps, createExp, updateExp, deleteExp }}>
      {children}
    </ExperienceContext.Provider>
  )
}
