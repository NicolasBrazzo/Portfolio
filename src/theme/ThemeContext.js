import { createContext, useContext } from 'react'

/* Le chiavi di localStorage devono coincidere con quelle usate
   dallo script bloccante in index.html: se cambiano qui, vanno
   cambiate anche lì, altrimenti si riapre il flash a ogni ricarica. */
export const THEME_STORAGE_KEY = 'theme'
export const ACCENT_STORAGE_KEY = 'accent'

export const THEMES = ['light', 'dark']
export const ACCENTS = ['mark'] // TODO Task 1: altri 3 accenti da approvare

export const ThemeContext = createContext(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme deve essere usato dentro <ThemeProvider>')
  return ctx
}
