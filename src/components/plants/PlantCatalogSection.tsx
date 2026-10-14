import { useMemo, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import {
  Droplets,
  RotateCcw,
  Search,
  Sprout,
  TreePine,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  getAllPlants,
  plantCategories,
  type PlantCategory,
  type PlantSpecies,
} from '../../data/plants'
import { nurseries } from '../../data/nurseries'
import { PlantCard } from './PlantCard'
import { PlantDetailModal } from './PlantDetailModal'
import { Reveal } from '../animation/Reveal'
import { cn } from '../../utils/cn'

interface PlantCatalogSectionProps {
  initialNurseryFilter?: string
}

export function PlantCatalogSection({
  initialNurseryFilter = 'all',
}: PlantCatalogSectionProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<PlantCategory | 'all'>('all')
  const [selectedDrought, setSelectedDrought] = useState<'all' | 'high' | 'moderate'>('all')
  const [selectedNursery, setSelectedNursery] = useState<string>(initialNurseryFilter)
  const [selectedPlant, setSelectedPlant] = useState<PlantSpecies | null>(null)

  const allPlants = useMemo(() => getAllPlants(), [])

  const filteredPlants = useMemo(() => {
    return allPlants.filter((plant) => {
      // Category filter
      if (selectedCategory !== 'all' && plant.category !== selectedCategory) {
        return false
      }

      // Drought filter
      if (selectedDrought === 'high' && plant.droughtResistanceLevel < 4) {
        return false
      }
      if (selectedDrought === 'moderate' && plant.droughtResistanceLevel >= 4) {
        return false
      }

      // Nursery filter
      if (selectedNursery !== 'all') {
        const hasNursery = plant.availabilities.some(
          (avail) => avail.nurseryId === selectedNursery,
        )
        if (!hasNursery) return false
      }

      // Search query filter
      if (!searchQuery.trim()) return true

      const q = searchQuery.toLowerCase().trim()
      const matchCommonFr = plant.commonNameFr.toLowerCase().includes(q)
      const matchCommonAr = plant.commonNameAr.includes(q)
      const matchScientific = plant.scientificName.toLowerCase().includes(q)
      const matchFamilyFr = plant.familyFr.toLowerCase().includes(q)
      const matchFamilyAr = plant.familyAr.includes(q)
      const matchUsesFr = plant.usesFr.some((u) => u.toLowerCase().includes(q))
      const matchUsesAr = plant.usesAr.some((u) => u.includes(q))
      const matchWilaya = plant.availabilities.some((a) =>
        a.wilaya.toLowerCase().includes(q),
      )
      const matchNurseryName = plant.availabilities.some(
        (a) =>
          a.nurseryNameFr.toLowerCase().includes(q) ||
          a.nurseryNameAr.includes(q),
      )

      return (
        matchCommonFr ||
        matchCommonAr ||
        matchScientific ||
        matchFamilyFr ||
        matchFamilyAr ||
        matchUsesFr ||
        matchUsesAr ||
        matchWilaya ||
        matchNurseryName
      )
    })
  }, [allPlants, selectedCategory, selectedDrought, selectedNursery, searchQuery])

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedDrought !== 'all' ||
    selectedNursery !== 'all' ||
    searchQuery.trim().length > 0

  const handleReset = () => {
    setSelectedCategory('all')
    setSelectedDrought('all')
    setSelectedNursery('all')
    setSearchQuery('')
  }

  return (
    <section id="catalogue-plantes" className="section-band section-band-muted">
      <div className="site-container">
        {/* Section Header */}
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">{t('plantCatalog.eyebrow')}</p>
          <h2 className="section-title">{t('plantCatalog.title')}</h2>
          <p className="section-description">{t('plantCatalog.description')}</p>
        </Reveal>

        {/* Filter Controls Container */}
        <div className="mt-8 space-y-4">
          {/* Search Bar */}
          <div className="nurseries-search-bar">
            <Search className="size-5 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('plantCatalog.searchPlaceholder')}
              className="nurseries-search-input"
              aria-label={t('plantCatalog.searchLabel')}
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

          {/* Filter Chips & Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] shadow-xs">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors',
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]/80',
                )}
              >
                {t('plantCatalog.filterAllCategories')}
              </button>

              {plantCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors',
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]/80',
                  )}
                >
                  {t(cat.labelKey)}
                </button>
              ))}
            </div>

            {/* Sub-Filters: Drought & Nursery Select */}
            <div className="flex flex-wrap items-center gap-2.5 ms-auto">
              {/* Drought Select */}
              <div className="flex items-center gap-1 text-xs">
                <Droplets className="size-3.5 text-sky-500" aria-hidden="true" />
                <select
                  value={selectedDrought}
                  onChange={(e) =>
                    setSelectedDrought(e.target.value as 'all' | 'high' | 'moderate')
                  }
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  aria-label={t('plantCatalog.filterDrought')}
                >
                  <option value="all">{t('plantCatalog.droughtLevels.all')}</option>
                  <option value="high">{t('plantCatalog.droughtLevels.high')}</option>
                  <option value="moderate">{t('plantCatalog.droughtLevels.moderate')}</option>
                </select>
              </div>

              {/* Nursery Filter Select */}
              <div className="flex items-center gap-1 text-xs">
                <Sprout className="size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <select
                  value={selectedNursery}
                  onChange={(e) => setSelectedNursery(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  aria-label={t('plantCatalog.filterNursery')}
                >
                  <option value="all">{t('plantCatalog.allNurseries')}</option>
                  {nurseries.map((n) => (
                    <option key={n.id} value={n.id}>
                      {isArabic ? n.nameAr : n.nameFr} ({n.wilaya})
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors"
                >
                  <RotateCcw className="size-3" aria-hidden="true" />
                  <span>{t('plantCatalog.resetFilters')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] px-1">
            <span>{t('plantCatalog.resultsCount', { count: filteredPlants.length })}</span>
          </div>
        </div>

        {/* Plants Grid or Empty State */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onSelect={(p) => setSelectedPlant(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-[var(--surface-primary)] rounded-2xl border border-[var(--border-subtle)] mt-6 space-y-3">
            <TreePine className="size-12 text-[var(--text-muted)] mx-auto opacity-50" aria-hidden="true" />
            <p className="text-base font-semibold text-[var(--text-primary)]">
              {t('plantCatalog.noResults')}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              <span>{t('plantCatalog.resetFilters')}</span>
            </button>
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedPlant && (
            <PlantDetailModal
              plant={selectedPlant}
              onClose={() => setSelectedPlant(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
