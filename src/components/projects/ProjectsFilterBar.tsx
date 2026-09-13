import { useId } from 'react'
import { Filter, MapPin, RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  projectCategoryFilters,
  projectStatusFilters,
  projectWilayaFilters,
  type ProjectCategory,
  type ProjectStatus,
} from '../../data/projectsPage'

interface ProjectsFilterBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: ProjectCategory
  onCategoryChange: (cat: ProjectCategory) => void
  selectedWilaya: string
  onWilayaChange: (wilaya: string) => void
  selectedStatus: ProjectStatus
  onStatusChange: (status: ProjectStatus) => void
  filteredCount: number
  totalCount: number
  onReset: () => void
}

export function ProjectsFilterBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedWilaya,
  onWilayaChange,
  selectedStatus,
  onStatusChange,
  filteredCount,
  totalCount,
  onReset,
}: ProjectsFilterBarProps) {
  const { t } = useTranslation()
  const searchInputId = useId()
  const wilayaSelectId = useId()
  const statusSelectId = useId()

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedWilaya !== 'all' ||
    selectedStatus !== 'all'

  return (
    <div className="projects-filter-container">
      {/* Top row: search & dropdowns */}
      <div className="projects-filter-top-row">
        {/* Search input */}
        <div className="projects-search-box">
          <label htmlFor={searchInputId} className="sr-only">
            {t('projectsPage.filters.searchPlaceholder')}
          </label>
          <Search className="projects-search-icon size-4" aria-hidden="true" />
          <input
            id={searchInputId}
            type="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('projectsPage.filters.searchPlaceholder')}
            className="projects-search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="projects-search-clear"
              aria-label="Effacer la recherche"
            >
              &times;
            </button>
          )}
        </div>

        {/* Dropdowns row */}
        <div className="projects-dropdowns-group">
          {/* Wilaya select */}
          <div className="projects-select-wrapper">
            <label htmlFor={wilayaSelectId} className="sr-only">
              {t('projectsPage.filters.wilayaLabel')}
            </label>
            <MapPin className="projects-select-icon size-4" aria-hidden="true" />
            <select
              id={wilayaSelectId}
              value={selectedWilaya}
              onChange={(e) => onWilayaChange(e.target.value)}
              className="projects-select-input"
              aria-label={t('projectsPage.filters.wilayaLabel')}
            >
              {projectWilayaFilters.map((w) => (
                <option key={w.id} value={w.id}>
                  {t(w.labelKey)}
                </option>
              ))}
            </select>
          </div>

          {/* Status select */}
          <div className="projects-select-wrapper">
            <label htmlFor={statusSelectId} className="sr-only">
              {t('projectsPage.filters.statusLabel')}
            </label>
            <SlidersHorizontal className="projects-select-icon size-4" aria-hidden="true" />
            <select
              id={statusSelectId}
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value as ProjectStatus)}
              className="projects-select-input"
              aria-label={t('projectsPage.filters.statusLabel')}
            >
              {projectStatusFilters.map((s) => (
                <option key={s.id} value={s.id}>
                  {t(s.labelKey)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div
        className="projects-category-tabs"
        role="toolbar"
        aria-label={t('projectsPage.filters.categoryLabel')}
      >
        <span className="projects-filter-label" id="projects-category-filter-label">
          <Filter className="size-3.5 inline-block text-[var(--brand-primary)]" aria-hidden="true" />
          <span>{t('projectsPage.filters.categoryLabel')}</span>
        </span>
        <div
          className="projects-tab-list"
          role="tablist"
          aria-labelledby="projects-category-filter-label"
        >
          {projectCategoryFilters.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat.id)}
                className={`projects-tab-button ${isActive ? 'projects-tab-active' : ''}`}
              >
                <span>{t(cat.labelKey)}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Status Bar */}
      <div className="projects-status-bar">
        <span className="projects-results-count">
          {t('projectsPage.filters.countLabel', {
            count: filteredCount,
            total: totalCount,
          })}
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="projects-reset-button"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            <span>{t('projectsPage.filters.resetFilters')}</span>
          </button>
        )}
      </div>
    </div>
  )
}
