import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'

import {
  ThemeContext,
  type ResolvedTheme,
  type ThemeContextValue,
  type ThemePreference,
} from './theme-context'

const themeStorageKey = 'ergr-zaccar-theme'

function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark'
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialPreference(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const storedPreference = window.localStorage.getItem(themeStorageKey)

  return isThemePreference(storedPreference) ? storedPreference : 'system'
}

function resolveTheme(preference: ThemePreference, systemTheme: ResolvedTheme): ResolvedTheme {
  return preference === 'system' ? systemTheme : preference
}

function subscribeToSystemTheme(onStoreChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => undefined
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', onStoreChange)

  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getServerTheme(): ResolvedTheme {
  return 'light'
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [preference, setPreferenceState] = useState<ThemePreference>(getInitialPreference)
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, getServerTheme)
  const resolvedTheme = resolveTheme(preference, systemTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
    document.documentElement.style.colorScheme = resolvedTheme
    window.localStorage.setItem(themeStorageKey, preference)
  }, [preference, resolvedTheme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      preference,
      resolvedTheme,
      setPreference: setPreferenceState,
    }),
    [preference, resolvedTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
