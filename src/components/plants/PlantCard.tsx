import { Droplets, Eye, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import type { PlantSpecies } from '../../data/plants'
import { cn } from '../../utils/cn'

interface PlantCardProps {
  plant: PlantSpecies
  onSelect: (plant: PlantSpecies) => void
}

export function PlantCard({ plant, onSelect }: PlantCardProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const shouldReduceMotion = useReducedMotion()

  const commonName = isArabic ? plant.commonNameAr : plant.commonNameFr
  const family = isArabic ? plant.familyAr : plant.familyFr
  const annualProduction = isArabic
    ? plant.annualProductionAr
    : plant.annualProductionFr

  // Unique wilayas list for quick preview
  const wilayas = Array.from(new Set(plant.availabilities.map((a) => a.wilaya)))

  return (
    <motion.article
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group flex flex-col h-full rounded-2xl overflow-hidden',
        'bg-[var(--surface-primary)] border border-[var(--border-subtle)]',
        'hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300',
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[var(--surface-secondary)]">
        <img
          src={plant.photo}
          alt={commonName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 start-3 end-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 text-white backdrop-blur-xs shadow-xs">
            {t(`plantCatalog.categories.${plant.category}`)}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-xs">
            <Droplets className="size-3 text-sky-400" aria-hidden="true" />
            <span>{plant.droughtResistanceLevel}/5</span>
          </span>
        </div>

        {/* Bottom Bar on Photo */}
        <div className="absolute bottom-2.5 start-3 end-3 text-white">
          <p className="text-xs font-medium text-white/80 line-clamp-1">{family}</p>
          <h3 className="text-lg font-bold text-white leading-tight drop-shadow-xs">
            {commonName}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          {/* Scientific Name */}
          <p className="text-xs italic text-[var(--text-muted)] font-serif">
            {plant.scientificName}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-subtle)]">
            <div className="p-2 rounded-lg bg-[var(--surface-secondary)]/60 text-xs">
              <span className="text-[var(--text-muted)] block text-[10px] uppercase font-semibold">
                {t('plantCatalog.card.annualProduction')}
              </span>
              <span className="font-bold text-[var(--text-primary)] text-xs truncate block">
                {annualProduction}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-[var(--surface-secondary)]/60 text-xs">
              <span className="text-[var(--text-muted)] block text-[10px] uppercase font-semibold">
                {t('plantCatalog.card.droughtScore')}
              </span>
              <span className="font-bold text-sky-600 dark:text-sky-400 text-xs truncate block">
                {plant.droughtResistanceLevel >= 4
                  ? isArabic ? 'عالية جداً' : 'Très élevée'
                  : isArabic ? 'متوسطة' : 'Modérée'}
              </span>
            </div>
          </div>

          {/* « Où trouver cette espèce ? » Preview */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
                <MapPin className="size-3 shrink-0" aria-hidden="true" />
                <span>{t('plantCatalog.card.whereToFind')}</span>
              </span>
              <span className="text-[11px]">
                {t('plantCatalog.card.availableAt', { count: plant.availabilities.length })}
              </span>
            </div>

            <div className="flex flex-wrap gap-1">
              {wilayas.map((wilaya) => (
                <span
                  key={wilaya}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                >
                  {wilaya}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => onSelect(plant)}
          className={cn(
            'w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold',
            'bg-[var(--surface-secondary)] hover:bg-emerald-600 hover:text-white',
            'text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-emerald-600',
            'transition-all duration-200 focus-ring active:scale-[0.98]',
          )}
        >
          <Eye className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{t('plantCatalog.card.viewDetails')}</span>
        </button>
      </div>
    </motion.article>
  )
}
