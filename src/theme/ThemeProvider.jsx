import { useState, useCallback, useEffect } from 'react'
import { ThemeContext, THEMES, ACCENTS, THEME_STORAGE_KEY, ACCENT_STORAGE_KEY } from './ThemeContext'

/* Lo script bloccante in index.html ha già impostato data-theme
   e data-accent su <html> prima del primo paint: leggiamo da lì
   invece che da localStorage per non poter mai divergere da quanto
   l'utente vede già a schermo. */
function readAttribute(name, allowed, fallback) {
  if (typeof document === 'undefined') return fallback
  const value = document.documentElement.getAttribute(name)
  return allowed.includes(value) ? value : fallback
}

function persist(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* localStorage non disponibile: il tema resta valido per la
       sessione corrente, si perde solo la persistenza */
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => readAttribute('data-theme', THEMES, 'light'))
  const [accent, setAccentState] = useState(() => readAttribute('data-accent', ACCENTS, 'mark'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    persist(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
    persist(ACCENT_STORAGE_KEY, accent)
  }, [accent])

  const setTheme = useCallback((next) => {
    setThemeState(THEMES.includes(next) ? next : 'light')
  }, [])

  const setAccent = useCallback((next) => {
    setAccentState(ACCENTS.includes(next) ? next : 'mark')
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, accent, setAccent, themes: THEMES, accents: ACCENTS }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
