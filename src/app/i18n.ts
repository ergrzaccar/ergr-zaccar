import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { ar } from '../data/i18n/ar'
import { fr } from '../data/i18n/fr'

export const supportedLanguages = ['fr', 'ar'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

export const languageDirections: Record<SupportedLanguage, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  ar: 'rtl',
}

const languageStorageKey = 'ergr-zaccar-language'

function normalizeLanguage(language: string | null | undefined): SupportedLanguage {
  return language?.startsWith('ar') ? 'ar' : 'fr'
}

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return 'fr'
  }

  const storedLanguage = window.localStorage.getItem(languageStorageKey)

  if (storedLanguage === 'fr' || storedLanguage === 'ar') {
    return storedLanguage
  }

  return normalizeLanguage(window.navigator.language)
}

void i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    ar: { translation: ar },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
})

export { i18n, languageStorageKey, normalizeLanguage }

export function getOppositeLanguage(language: SupportedLanguage): SupportedLanguage {
  return language === 'fr' ? 'ar' : 'fr'
}
