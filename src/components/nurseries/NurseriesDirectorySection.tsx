import { useMemo, useState } from 'react'
import { Building2, Droplets, Filter, MapPin, RotateCcw, Search, Sprout } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import {
  nurseries,
  regionFilterList,
  wilayaFilterList,
  type NurseryRegionFilter,
  type NurseryWilayaFilter,
} from '../../data/nurseriesPage'
import { Reveal } from '../animation/Reveal'
import { cn } from '../../utils/cn'

export function NurseriesDirectorySection() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const isArabic = i18n.language === 'ar'

  const [selectedWilaya, setSelectedWilaya] = useState<NurseryWilayaFilter>('all')
  const [selectedRegion, setSelectedRegion] = useState<NurseryRegionFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNurseries = useMemo(() => {
    return nurseries.filter((item) => {
      const matchWilaya = selectedWilaya === 'all' || item.wilaya === selectedWilaya
      const matchRegion = selectedRegion === 'all' || item.regionalDirection === selectedRegion

      if (!matchWilaya || !matchRegion) return false

      if (!searchQuery.trim()) return true

      const query = searchQuery.toLowerCase().trim()
      const matchNameFr = item.nameFr.toLowerCase().includes(query)
      const matchNameAr = item.nameAr.includes(query)
      const matchWilayaText = item.wilaya.toLowerCase().includes(query)

      return matchNameFr || matchNameAr || matchWilayaText
    })
  }, [selectedWilaya, selectedRegion, searchQuery])

  const hasActiveFilters =
    selectedWilaya !== 'all' || selectedRegion !== 'all' || searchQuery.trim().length > 0

  const handleResetFilters = () => {
    setSelectedWilaya('all')
    setSelectedRegion('all')
    setSearchQuery('')
  }

  return (
    <section id="nurseries-directory" className="section-band section-band-muted">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">{t('nurseriesPage.directory.eyebrow')}</p>
          <h2 className="section-title">{t('nurseriesPage.directory.title')}</h2>
          <p className="section-description">{t('nurseriesPage.directory.description')}</p>
        </Reveal>

        {/* Controls Bar */}
        <div className="nurseries-controls-container mt-10">
          <div className="nurseries-search-bar">
            <Search className="size-5 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('nurseriesPage.directory.searchPlaceholder')}
              className="nurseries-search-input"
              aria-label={t('nurseriesPage.directory.searchPlaceholder')}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="nurseries-clear-btn"
                aria-label="Effacer la recherche"
              >
                &times;
              </button>
            )}
          </div>

          <div className="nurseries-filters-wrapper">
            <div className="nurseries-filter-group">
              <span className="nurseries-filter-label">
                <Filter className="size-3.5" aria-hidden="true" />
                <span>{t('nurseriesPage.filters.wilayaLabel')}</span>
              </span>
              <div className="nurseries-filter-chips">
                {wilayaFilterList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedWilaya(item.id)}
                    className={cn(
                      'nurseries-filter-chip',
                      selectedWilaya === item.id && 'nurseries-filter-chip-active',
                    )}
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <div className="nurseries-filter-group">
              <span className="nurseries-filter-label">
                <Building2 className="size-3.5" aria-hidden="true" />
                <span>{t('nurseriesPage.filters.regionLabel')}</span>
              </span>
              <div className="nurseries-filter-chips">
                {regionFilterList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedRegion(item.id)}
                    className={cn(
                      'nurseries-filter-chip',
                      selectedRegion === item.id && 'nurseries-filter-chip-active',
                    )}
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="nurseries-results-meta">
            <span className="text-sm font-semibold text-[var(--text-secondary)]">
              {t('nurseriesPage.directory.countLabel', { count: filteredNurseries.length })}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="nurseries-reset-btn"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                <span>{t('nurseriesPage.directory.resetFilters')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Nursery Cards Grid */}
        {filteredNurseries.length > 0 ? (
          <div className="nurseries-grid mt-8">
            {filteredNurseries.map((nursery, index) => {
              const displayName = isArabic ? nursery.nameAr : nursery.nameFr
              const secondaryName = isArabic ? nursery.nameFr : nursery.nameAr

              return (
                <motion.article
                  key={nursery.id}
                  className="nursery-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                >
                  <div className="nursery-card-header">
                    <div>
                      <span className="nursery-card-badge">{nursery.wilaya}</span>
                      <h3 className="nursery-card-title">{displayName}</h3>
                      <p className="nursery-card-subtitle">{secondaryName}</p>
                    </div>
                    <span className="nursery-icon-badge" title="Pépinière de production">
                      <Sprout className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="nursery-metrics-row">
                    <div className="nursery-metric-pill">
                      <span className="nursery-metric-label">{t('nurseriesPage.directory.totalAreaBadge')}</span>
                      <strong className="nursery-metric-value">{nursery.totalAreaHa} ha</strong>
                    </div>
                    <div className="nursery-metric-pill nursery-metric-pill-highlight">
                      <span className="nursery-metric-label">{t('nurseriesPage.directory.sauBadge')}</span>
                      <strong className="nursery-metric-value">{nursery.usefulAgriculturalAreaHa} ha</strong>
                    </div>
                  </div>

                  <div className="nursery-card-details">
                    <div className="nursery-detail-line">
                      <MapPin className="size-4 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
                      <span>Wilaya de {nursery.wilaya}</span>
                    </div>
                    <div className="nursery-detail-line">
                      <Building2 className="size-4 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
                      <span>{t('nurseriesPage.directory.regionalDirection')} : {nursery.regionalDirection}</span>
                    </div>
                    <div className="nursery-detail-line">
                      <Droplets className="size-4 text-[var(--technical-blue)] shrink-0" aria-hidden="true" />
                      <span className="text-[var(--text-primary)] font-medium">
                        {t('nurseriesPage.directory.irrigatedBadge')} (Réseau sous pression)
                      </span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        ) : (
          <div className="nurseries-empty-state">
            <Sprout className="size-12 text-[var(--text-muted)]" aria-hidden="true" />
            <h3>{t('nurseriesPage.directory.noResultsTitle')}</h3>
            <p>{t('nurseriesPage.directory.noResultsText')}</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="premium-button mt-4"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              <span>{t('nurseriesPage.directory.resetFilters')}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
