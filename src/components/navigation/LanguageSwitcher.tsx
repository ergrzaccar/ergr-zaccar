import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getOppositeLanguage, normalizeLanguage } from '../../app/i18n'
import { cn } from '../../utils/cn'

type LanguageSwitcherProps = {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation()
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)
  const nextLanguage = getOppositeLanguage(language)

  async function handleLanguageChange() {
    await i18n.changeLanguage(nextLanguage)
  }

  return (
    <button
      type="button"
      className={cn('control-button gap-2', className)}
      onClick={handleLanguageChange}
      aria-label={t('language.change')}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span>{t('common.switchLanguage')}</span>
    </button>
  )
}
