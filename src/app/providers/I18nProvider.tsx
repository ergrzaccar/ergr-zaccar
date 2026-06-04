import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { languageDirections, languageStorageKey, normalizeLanguage } from '../i18n'

export function I18nProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = languageDirections[language]
    document.documentElement.dataset.locale = language
    window.localStorage.setItem(languageStorageKey, language)
  }, [language])

  return children
}
