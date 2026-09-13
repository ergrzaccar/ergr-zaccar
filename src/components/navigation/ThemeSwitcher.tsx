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
  showLabels?: boolean
}

export function ThemeSwitcher({ className, showLabels = false }: ThemeSwitcherProps) {
  const { t } = useTranslation()
  const { preference, setPreference } = useTheme()

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-base)] p-0.5 sm:p-1',
        className
      )}
      role="group"
      aria-label={t('theme.change')}
    >
      {themeOptions.map(({ value, icon: Icon, labelKey }) => {
        const isActive = preference === value
        const label = t(labelKey)

        return (
          <button
            key={value}
            type="button"
            className={cn(
              'inline-flex min-h-8 sm:min-h-9 items-center justify-center gap-1.5 rounded-full px-2 sm:px-2.5 text-xs font-semibold transition',
              'text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]',
              isActive &&
                'bg-[var(--brand-primary)] text-[var(--text-on-brand)] shadow-sm font-bold',
            )}
            onClick={() => setPreference(value as ThemePreference)}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
          >
            <Icon className="size-3.5 sm:size-4 shrink-0" aria-hidden="true" />
            <span className={cn('text-xs', showLabels ? 'inline' : 'hidden 2xl:inline')}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
