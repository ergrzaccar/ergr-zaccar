import { useId, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Car,
  Construction,
  Filter,
  Hammer,
  RotateCcw,
  Search,
  Tractor,
  Truck,
  Wrench,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { Reveal } from '../animation/Reveal'
import {
  categoryFilterList,
  equipmentInventory,
  type EquipmentCategoryFilter,
} from '../../data/resourcesPage'
import { equipment } from '../../data/equipment'

const categoryIcons: Record<string, LucideIcon> = {
  earthworks: Construction,
  agricultural: Tractor,
  transport: Truck,
  construction: Hammer,
  support: Car,
}

const itemIcons: Record<string, LucideIcon> = {
  bulldozers: Construction,
  graders: Construction,
  'backhoe-loaders': Construction,
  loaders: Construction,
  'agricultural-tractors': Tractor,
  'hydraulic-drills': Wrench,
  'agricultural-trucks': Truck,
  trucks: Truck,
  forklifts: Construction,
  compactors: Construction,
  'road-tractors': Truck,
  'equipment-carrier-trailers': Truck,
  'semi-trailers': Truck,
  'concrete-mixers': Hammer,
  vehicles: Car,
}

export function ResourcesFleetSection() {
  const { t, i18n } = useTranslation()
  const searchInputId = useId()
  const locale = i18n.language === 'ar' ? 'ar-DZ' : 'fr-DZ'

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Compute machine totals per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: equipment.totalInventoriedItems }
    for (const item of equipmentInventory) {
      counts[item.category] = (counts[item.category] || 0) + item.count
    }
    return counts
  }, [])

  // Filter inventory
  const filteredInventory = useMemo(() => {
    return equipmentInventory.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory

      if (!matchesCategory) return false

      if (!searchTerm.trim()) return true

      const itemName = t(item.labelKey).toLowerCase()
      const searchNormalized = searchTerm.trim().toLowerCase()
      return itemName.includes(searchNormalized)
    })
  }, [selectedCategory, searchTerm, t])

  const totalFilteredUnits = useMemo(() => {
    return filteredInventory.reduce((acc, item) => acc + item.count, 0)
  }, [filteredInventory])

  const handleReset = () => {
    setSelectedCategory('all')
    setSearchTerm('')
  }

  return (
    <section id="fleet-inventory" className="section-band resources-fleet-section">
      <div className="site-container">
        <div className="resources-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('resourcesPage.fleet.eyebrow')}</p>
            <h2 className="section-title">{t('resourcesPage.fleet.title')}</h2>
            <p className="section-lead">{t('resourcesPage.fleet.description')}</p>
          </Reveal>
        </div>

        {/* Filter Controls Bar */}
        <div className="resources-filter-container">
          <div className="resources-filter-bar">
            {/* Search Input */}
            <div className="resources-search-box">
              <label htmlFor={searchInputId} className="sr-only">
                {t('resourcesPage.filters.searchPlaceholder')}
              </label>
              <Search className="resources-search-icon size-4" aria-hidden="true" />
              <input
                id={searchInputId}
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('resourcesPage.filters.searchPlaceholder')}
                className="resources-search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="resources-search-clear"
                  aria-label="Effacer la recherche"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div
              className="resources-category-tabs"
              role="toolbar"
              aria-label={t('resourcesPage.filters.categoryLabel')}
            >
              <span className="resources-filter-label" id="category-filter-label">
                <Filter className="size-3.5 inline-block text-[var(--brand-primary)]" aria-hidden="true" />
                <span>{t('resourcesPage.filters.categoryLabel')}</span>
              </span>
              <div className="resources-tab-list" role="tablist" aria-labelledby="category-filter-label">
                {categoryFilterList.map((cat) => {
                  const isActive = selectedCategory === cat.id
                  const count = categoryCounts[cat.id] || 0
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`resources-tab-button ${isActive ? 'resources-tab-active' : ''}`}
                    >
                      <span>{t(cat.labelKey)}</span>
                      <span className="resources-tab-pill">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Filter Status Summary */}
          <div className="resources-status-bar">
            <span className="resources-results-count">
              {t('resourcesPage.filters.countLabel', {
                count: filteredInventory.length,
                total: totalFilteredUnits,
              })}
            </span>

            {(selectedCategory !== 'all' || searchTerm.trim() !== '') && (
              <button
                type="button"
                onClick={handleReset}
                className="resources-reset-button"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                <span>{t('resourcesPage.filters.resetFilters')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Equipment Cards Grid */}
        {filteredInventory.length > 0 ? (
          <div className="resources-equipment-grid">
            {filteredInventory.map((item) => {
              const ItemIcon = itemIcons[item.id] || categoryIcons[item.category] || Construction
              const percent = ((item.count / equipment.totalInventoriedItems) * 100).toFixed(1)
              const categoryLabel = t(`equipment.categories.${item.category}`)

              return (
                <article key={item.id} className="resources-equipment-card">
                  <div className="resources-card-top">
                    <span className="resources-card-category-badge">{categoryLabel}</span>
                    <span className="resources-card-percentage">
                      {t('resourcesPage.fleet.shareOfFleet', { percent })}
                    </span>
                  </div>

                  <div className="resources-card-main">
                    <div className="resources-card-icon-wrap">
                      <ItemIcon className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
                    </div>
                    <div className="resources-card-info">
                      <h3 className="resources-card-title">{t(item.labelKey)}</h3>
                      <p className="resources-card-count">
                        <strong className="resources-count-number">
                          <AnimatedCounter value={item.count} locale={locale} />
                        </strong>
                        <span className="resources-count-label">
                          {t('resourcesPage.fleet.unitsCount', { count: item.count })}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Visual ratio bar */}
                  <div className="resources-card-bar-wrapper" aria-hidden="true">
                    <div
                      className="resources-card-bar"
                      style={{ width: `${Math.max(6, Math.min(100, (item.count / 199) * 100))}%` }}
                    />
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="resources-empty-state">
            <Construction className="size-12 mx-auto text-[var(--text-muted)] opacity-60" aria-hidden="true" />
            <h3>{t('nurseriesPage.directory.noResultsTitle')}</h3>
            <p>{t('nurseriesPage.directory.noResultsText')}</p>
            <button
              type="button"
              onClick={handleReset}
              className="premium-button premium-button-secondary mt-4"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              <span>{t('resourcesPage.filters.resetFilters')}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
