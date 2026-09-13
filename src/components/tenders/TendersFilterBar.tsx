import { Filter, RotateCcw, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  type TenderDomain,
  tenderDomainOptions,
  type TenderStatus,
  tenderStatusOptions,
} from '../../data/tendersPage'

interface TendersFilterBarProps {
  status: TenderStatus
  onStatusChange: (status: TenderStatus) => void
  domain: TenderDomain
  onDomainChange: (domain: TenderDomain) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onReset: () => void
  hasActiveFilters: boolean
  resultsCount: number
}

export function TendersFilterBar({
  status,
  onStatusChange,
  domain,
  onDomainChange,
  searchQuery,
  onSearchChange,
  onReset,
  hasActiveFilters,
  resultsCount,
}: TendersFilterBarProps) {
  const { t } = useTranslation()

  const countLabel =
    resultsCount > 1
      ? t('tendersPage.filters.activeCount_other', { count: resultsCount })
      : t('tendersPage.filters.activeCount', { count: resultsCount })

  return (
    <div className="tenders-filter-bar">
      {/* Status Tabs */}
      <div className="tenders-status-tabs" role="tablist" aria-label={t('tendersPage.filters.eyebrow')}>
        {tenderStatusOptions.map((opt) => {
          const isActive = status === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`tenders-status-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => onStatusChange(opt.id)}
            >
              {t(opt.labelKey)}
            </button>
          )
        })}
      </div>

      {/* Controls row: Domain filter, Search input, Reset, Count */}
      <div className="tenders-controls-row">
        {/* Domain Select */}
        <div className="tenders-select-wrapper">
          <label htmlFor="tender-domain-select" className="sr-only">
            {t('tendersPage.filters.domainAll')}
          </label>
          <div className="tenders-input-icon">
            <Filter className="size-4 text-[var(--text-tertiary)]" aria-hidden="true" />
          </div>
          <select
            id="tender-domain-select"
            value={domain}
            onChange={(e) => onDomainChange(e.target.value as TenderDomain)}
            className="tenders-select"
          >
            {tenderDomainOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
        </div>

        {/* Search input */}
        <div className="tenders-search-wrapper">
          <label htmlFor="tender-search-input" className="sr-only">
            {t('tendersPage.filters.searchPlaceholder')}
          </label>
          <div className="tenders-input-icon">
            <Search className="size-4 text-[var(--text-tertiary)]" aria-hidden="true" />
          </div>
          <input
            id="tender-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('tendersPage.filters.searchPlaceholder')}
            className="tenders-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="tenders-search-clear"
              aria-label="Effacer la recherche"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="tenders-reset-button"
            title={t('tendersPage.filters.resetFilters')}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            <span>{t('tendersPage.filters.resetFilters')}</span>
          </button>
        )}

        {/* Counter badge */}
        <div className="tenders-count-badge" aria-live="polite">
          {countLabel}
        </div>
      </div>
    </div>
  )
}
