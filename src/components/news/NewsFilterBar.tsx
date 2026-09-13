import { Calendar, RotateCcw, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  type NewsCategory,
  newsCategoryOptions,
  type NewsYear,
  newsYearOptions,
} from '../../data/newsPage'

interface NewsFilterBarProps {
  selectedCategory: NewsCategory
  onCategoryChange: (category: NewsCategory) => void
  selectedYear: NewsYear
  onYearChange: (year: NewsYear) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onReset: () => void
  hasActiveFilters: boolean
  resultsCount: number
}

export function NewsFilterBar({
  selectedCategory,
  onCategoryChange,
  selectedYear,
  onYearChange,
  searchQuery,
  onSearchChange,
  onReset,
  hasActiveFilters,
  resultsCount,
}: NewsFilterBarProps) {
  const { t } = useTranslation()

  const countLabel =
    resultsCount > 1
      ? t('newsPage.filters.activeCount_other', { count: resultsCount })
      : t('newsPage.filters.activeCount', { count: resultsCount })

  return (
    <div className="news-filter-bar">
      {/* Category Tabs */}
      <div className="news-category-tabs" role="tablist" aria-label={t('newsPage.filters.eyebrow')}>
        {newsCategoryOptions.map((opt) => {
          const isActive = selectedCategory === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`news-category-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => onCategoryChange(opt.id)}
            >
              {t(opt.labelKey)}
            </button>
          )
        })}
      </div>

      {/* Controls row: Year filter, Search input, Reset, Count */}
      <div className="news-controls-row">
        {/* Year Select */}
        <div className="news-select-wrapper">
          <label htmlFor="news-year-select" className="sr-only">
            {t('newsPage.filters.years.all')}
          </label>
          <div className="news-input-icon">
            <Calendar className="size-4 text-[var(--text-tertiary)]" aria-hidden="true" />
          </div>
          <select
            id="news-year-select"
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value as NewsYear)}
            className="news-select"
          >
            {newsYearOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
        </div>

        {/* Search input */}
        <div className="news-search-wrapper">
          <label htmlFor="news-search-input" className="sr-only">
            {t('newsPage.filters.searchPlaceholder')}
          </label>
          <div className="news-input-icon">
            <Search className="size-4 text-[var(--text-tertiary)]" aria-hidden="true" />
          </div>
          <input
            id="news-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('newsPage.filters.searchPlaceholder')}
            className="news-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="news-search-clear"
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
            className="news-reset-button"
            title={t('newsPage.filters.resetFilters')}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            <span>{t('newsPage.filters.resetFilters')}</span>
          </button>
        )}

        {/* Counter badge */}
        <div className="news-count-badge" aria-live="polite">
          {countLabel}
        </div>
      </div>
    </div>
  )
}
