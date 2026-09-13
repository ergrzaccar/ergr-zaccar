import { Briefcase, FileCheck, MapPin, RotateCcw, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  type CareerDomain,
  careerDomainOptions,
  type CareerWilaya,
  careerWilayaOptions,
  type ContractType,
  contractTypeOptions,
} from '../../data/careersPage'

interface CareersFilterBarProps {
  selectedDomain: CareerDomain
  onDomainChange: (domain: CareerDomain) => void
  selectedContract: ContractType
  onContractChange: (contract: ContractType) => void
  selectedWilaya: CareerWilaya
  onWilayaChange: (wilaya: CareerWilaya) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onReset: () => void
  hasActiveFilters: boolean
  resultsCount: number
}

export function CareersFilterBar({
  selectedDomain,
  onDomainChange,
  selectedContract,
  onContractChange,
  selectedWilaya,
  onWilayaChange,
  searchQuery,
  onSearchChange,
  onReset,
  hasActiveFilters,
  resultsCount,
}: CareersFilterBarProps) {
  const { t } = useTranslation()

  return (
    <div className="careers-filter-bar">
      {/* Domain tabs */}
      <div className="careers-filter-domains-scroll" role="tablist" aria-label="Filtres par domaine">
        {careerDomainOptions.map((opt) => {
          const isActive = selectedDomain === opt.id
          return (
            <button
              key={opt.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => onDomainChange(opt.id)}
              className={`careers-domain-tab ${isActive ? 'is-active' : ''}`}
            >
              <Briefcase className="size-3.5" aria-hidden="true" />
              <span>{t(opt.labelKey)}</span>
            </button>
          )
        })}
      </div>

      {/* Dropdowns + Search + Reset Controls */}
      <div className="careers-filter-controls">
        {/* Contract type dropdown */}
        <div className="careers-select-wrapper">
          <FileCheck className="careers-select-icon size-4" aria-hidden="true" />
          <select
            value={selectedContract}
            onChange={(e) => onContractChange(e.target.value as ContractType)}
            className="careers-filter-select"
            aria-label={t('careersPage.filters.contracts.all')}
          >
            {contractTypeOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
        </div>

        {/* Wilaya dropdown */}
        <div className="careers-select-wrapper">
          <MapPin className="careers-select-icon size-4" aria-hidden="true" />
          <select
            value={selectedWilaya}
            onChange={(e) => onWilayaChange(e.target.value as CareerWilaya)}
            className="careers-filter-select"
            aria-label={t('careersPage.filters.wilayas.all')}
          >
            {careerWilayaOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="careers-search-wrapper">
          <Search className="careers-search-icon size-4" aria-hidden="true" />
          <input
            type="search"
            role="searchbox"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('careersPage.filters.searchPlaceholder')}
            className="careers-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="careers-search-clear"
              aria-label="Effacer la recherche"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Reset button if active */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="careers-reset-btn"
            title={t('careersPage.filters.resetFilters')}
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            <span>{t('careersPage.filters.resetFilters')}</span>
          </button>
        )}

        {/* Results badge */}
        <div className="careers-count-badge">
          {t('careersPage.filters.activeCount', { count: resultsCount })}
        </div>
      </div>
    </div>
  )
}
