import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSearchPalette } from '../../context/SearchContext'
import { cn } from '../../utils/cn'

interface SearchTriggerProps {
  className?: string
  compact?: boolean
  onClick?: () => void
}

export function SearchTrigger({ className, compact = false, onClick }: SearchTriggerProps) {
  const { t } = useTranslation()
  const { openSearch } = useSearchPalette()

  const handleClick = () => {
    onClick?.()
    openSearch()
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn('control-button', className)}
        aria-label={t('search.triggerAria')}
        title={t('search.triggerAria')}
      >
        <Search className="size-4.5" aria-hidden="true" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'group inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)] shadow-xs transition hover:border-[var(--brand-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]',
        className
      )}
      aria-label={t('search.triggerAria')}
      title={t('search.triggerAria')}
    >
      <Search className="size-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
      <span className="font-normal hidden 2xl:inline">{t('search.trigger')}</span>
      <kbd className="inline-flex items-center rounded border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--text-muted)] shadow-2xs">
        {t('search.shortcut')}
      </kbd>
    </button>
  )
}
