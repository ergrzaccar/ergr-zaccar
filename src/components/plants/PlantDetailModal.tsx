import { useEffect, useRef } from 'react'
import {
  CheckCircle2,
  Droplets,
  Gauge,
  Globe2,
  Layers,
  MapPin,
  Mountain,
  Package,
  Send,
  Sparkles,
  TreePine,
  X,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import type { PlantSpecies } from '../../data/plants'
import { SpeciesAvailabilityTable } from './SpeciesAvailabilityTable'
import { cn } from '../../utils/cn'

interface PlantDetailModalProps {
  plant: PlantSpecies | null
  onClose: () => void
}

export function PlantDetailModal({ plant, onClose }: PlantDetailModalProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const shouldReduceMotion = useReducedMotion()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plant) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [plant, onClose])

  if (!plant) return null

  const commonName = isArabic ? plant.commonNameAr : plant.commonNameFr
  const family = isArabic ? plant.familyAr : plant.familyFr
  const type = isArabic ? plant.typeAr : plant.typeFr
  const origin = isArabic ? plant.originAr : plant.originFr
  const plantingConditions = isArabic
    ? plant.plantingConditionsAr
    : plant.plantingConditionsFr
  const droughtResistance = isArabic
    ? plant.droughtResistanceAr
    : plant.droughtResistanceFr
  const climateZone = isArabic ? plant.climateZoneAr : plant.climateZoneFr
  const annualProduction = isArabic
    ? plant.annualProductionAr
    : plant.annualProductionFr
  const growthRate = isArabic ? plant.growthRateAr : plant.growthRateFr
  const uses = isArabic ? plant.usesAr : plant.usesFr

  const renderDroughtIndicator = (level: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((idx) => (
          <Droplets
            key={idx}
            className={cn(
              'size-4 transition-colors',
              idx <= level
                ? 'text-sky-500 fill-sky-500'
                : 'text-[var(--border-subtle)] fill-transparent',
            )}
            aria-hidden="true"
          />
        ))}
        <span className="text-xs font-semibold text-[var(--text-secondary)] ms-1.5">
          {level}/5
        </span>
      </div>
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-plant-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Card */}
      <motion.div
        ref={modalRef}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={cn(
          'relative w-full max-w-4xl max-h-[90vh] flex flex-col',
          'bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl',
          'shadow-2xl overflow-hidden z-10',
        )}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--surface-primary)]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TreePine className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {t('plantCatalog.modal.botanicalSheet')}
              </p>
              <h2
                id="modal-plant-title"
                className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-tight"
              >
                {commonName}{' '}
                <span className="text-sm font-medium italic text-[var(--text-muted)]">
                  ({plant.scientificName})
                </span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t('plantCatalog.modal.close')}
            className={cn(
              'p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)]',
              'hover:bg-[var(--surface-secondary)] transition-colors focus-ring',
            )}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6 space-y-8">
          {/* Top Hero Grid: Photo & Quick Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-sm bg-[var(--surface-secondary)] aspect-4/3 md:aspect-square">
              <img
                src={plant.photo}
                alt={commonName}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-white text-xs">
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs font-semibold">
                  {type}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-600/80 backdrop-blur-xs font-semibold">
                  {family}
                </span>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="md:col-span-7 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-[var(--surface-secondary)]/70 border border-[var(--border-subtle)] space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
                  <Droplets className="size-4 text-sky-500" aria-hidden="true" />
                  <span>{t('plantCatalog.modal.droughtResistance')}</span>
                </div>
                <div>{renderDroughtIndicator(plant.droughtResistanceLevel)}</div>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                  {droughtResistance}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-secondary)]/70 border border-[var(--border-subtle)] space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
                  <Package className="size-4 text-emerald-500" aria-hidden="true" />
                  <span>{t('plantCatalog.modal.annualCapacity')}</span>
                </div>
                <p className="text-base font-bold text-[var(--text-primary)]">
                  {annualProduction}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {plant.availabilities.length} {t('plantCatalog.card.availableAt', { count: plant.availabilities.length })}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-secondary)]/70 border border-[var(--border-subtle)] space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
                  <Mountain className="size-4 text-amber-500" aria-hidden="true" />
                  <span>{t('plantCatalog.modal.climateZone')}</span>
                </div>
                <p className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
                  {climateZone}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-secondary)]/70 border border-[var(--border-subtle)] space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
                  <Gauge className="size-4 text-purple-500" aria-hidden="true" />
                  <span>{t('plantCatalog.modal.growthRate')}</span>
                </div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  {growthRate}
                </p>
              </div>
            </div>
          </div>

          {/* Description & Origine */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
              <Globe2 className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>{t('plantCatalog.modal.origin')}</span>
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] bg-[var(--surface-secondary)]/40 p-3.5 rounded-xl border border-[var(--border-subtle)]">
              {origin}
            </p>
          </div>

          {/* Utilisations Principales */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
              <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>{t('plantCatalog.modal.keyUses')}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {uses.map((useText, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--surface-secondary)]/50 border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed"
                >
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{useText}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions de Plantation */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
              <Layers className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>{t('plantCatalog.modal.plantingConditions')}</span>
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] bg-[var(--surface-secondary)]/40 p-3.5 rounded-xl border border-[var(--border-subtle)]">
              {plantingConditions}
            </p>
          </div>

          {/* Section Vedette: OÙ TROUVER CETTE ESPÈCE ? */}
          <div className="space-y-4 pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <MapPin className="size-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span>{t('plantCatalog.modal.whereToFindTitle')}</span>
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {t('plantCatalog.modal.whereToFindSubtitle')}
                </p>
              </div>
            </div>

            <SpeciesAvailabilityTable
              availabilities={plant.availabilities}
              plantCommonName={commonName}
              scientificName={plant.scientificName}
            />
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--surface-primary)]/95 backdrop-blur-md">
          <div className="text-xs text-[var(--text-muted)]">
            {t('common.siteName')} • {family}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold',
                'border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] transition-colors',
              )}
            >
              {t('plantCatalog.modal.close')}
            </button>
            <Link
              to={`/contact?subject=${encodeURIComponent(
                `Demande d'information - Plants de ${plant.commonNameFr}`,
              )}&source=catalogue&plant=${encodeURIComponent(plant.commonNameFr)}`}
              onClick={onClose}
              className={cn(
                'inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold',
                'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95',
              )}
            >
              <Send className="size-3.5" aria-hidden="true" />
              <span>{t('plantCatalog.modal.contactDirectAction')}</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
