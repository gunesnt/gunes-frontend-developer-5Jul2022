import dayjs from 'dayjs'

export const DEFAULT_PROTECTED_PATH = '/'
export const SIGN_IN_PATH = '/sign-in'
export const SIGN_UP_PATH = '/sign-up'

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP__FB__API_KEY,
  authDomain: process.env.REACT_APP__FB__AUTH_DOMAIN,
  projectId: process.env.REACT_APP__FB__PROJECT_ID,
  storageBucket: process.env.REACT_APP__FB__STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP__FB__MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP__FB__APP_ID,
}

export const LEGAL_AGE = 18
export const MAX_LEGAL_DATE = dayjs().subtract(LEGAL_AGE, 'year')

export const COMPANY_SEARCH_API =
  'https://autocomplete.clearbit.com/v1/companies/suggest'
