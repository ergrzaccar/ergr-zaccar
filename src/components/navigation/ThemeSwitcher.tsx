import { Monitor, Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useTheme, type ThemePreference } from '../../app/theme/theme-context'
import { cn } from '../../utils/cn'

const themeOptions = [
  { value: 'system', icon: Monitor, labelKey: 'theme.system' },
  { value: 'light', icon: Sun, labelKey: 'theme.light' },
  { value: 'dark', icon: Moon, labelKey: 'theme.dark' },
] as const

type ThemeSwitcherProps = {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { t } = useTranslation()
  const { preference, setPreference } = useTheme()

  return (
    <div
      className={cn('inline-flex rounded-full border border-[var(--border-subtle)] p-1', className)}
      role="group"
      aria-label={t('theme.change')}
    >
      {themeOptions.map(({ value, icon: Icon, labelKey }) => (
        <button
          key={value}
          type="button"
          className={cn(
            'inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold transition',
            'text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]',
            preference === value &&
              'bg-[var(--brand-primary)] text-[var(--text-on-brand)] shadow-sm',
          )}
          onClick={() => setPreference(value as ThemePreference)}
          aria-pressed={preference === value}
        >
          <Icon className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{t(labelKey)}</span>
        </button>
      ))}
    </div>
  )
}
