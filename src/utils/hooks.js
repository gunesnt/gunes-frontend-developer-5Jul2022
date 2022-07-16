import { useMemo } from 'react'

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
