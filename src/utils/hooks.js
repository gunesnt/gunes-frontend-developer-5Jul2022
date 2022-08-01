import { useMemo, useState } from 'react'

export const useBoolean = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const toggleValue = () => setValue((currentValue) => !currentValue)
  return [value, toggleValue]
}

export const useOr = (values) =>
  useMemo(() => values.find(Boolean) || values[values.length - 1], values)

export const useFormikErrors = (formik) =>
  useMemo(() => {
    const newErrors = {}
    if (formik.submitCount < 1) return {}

    Object.entries(formik.touched).forEach(([key, value]) => {
      if (value) newErrors[key] = formik.errors[key]
    })

    return newErrors
  }, [formik.submitCount, formik.touched, formik.errors])

export const useModal = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return [open, handleOpen, handleClose]
}
export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleOpen = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  return [open, anchorEl, handleOpen, handleClose]
}
