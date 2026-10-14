import { CheckCircle2, Clock, Flame, MapPin, PhoneCall, Sprout } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import type { NurseryAvailability } from '../../data/plants'
import { cn } from '../../utils/cn'

interface SpeciesAvailabilityTableProps {
  availabilities: NurseryAvailability[]
  plantCommonName: string
  scientificName: string
}

export function SpeciesAvailabilityTable({
  availabilities,
  plantCommonName,
  scientificName,
}: SpeciesAvailabilityTableProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const formatNumber = (num: number) => {
    return isArabic ? num.toLocaleString('ar-DZ') : num.toLocaleString('fr-FR')
  }

  const getStatusBadge = (status: NurseryAvailability['status']) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{t('plantCatalog.modal.statusAvailable')}</span>
          </span>
        )
      case 'high-demand':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Flame className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{t('plantCatalog.modal.statusHighDemand')}</span>
          </span>
        )
      case 'in-production':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            <Clock className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{t('plantCatalog.modal.statusInProduction')}</span>
          </span>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-xs">
        <table className="w-full text-start text-sm">
          <thead className="bg-[var(--surface-secondary)] text-[var(--text-muted)] border-b border-[var(--border-subtle)] text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th scope="col" className="py-3.5 px-4 text-start">
                {t('plantCatalog.modal.colNursery')}
              </th>
              <th scope="col" className="py-3.5 px-4 text-start">
                {t('plantCatalog.modal.colWilaya')}
              </th>
              <th scope="col" className="py-3.5 px-4 text-start">
                {t('plantCatalog.modal.colQuantity')}
              </th>
              <th scope="col" className="py-3.5 px-4 text-start hidden sm:table-cell">
                {t('plantCatalog.modal.colPackaging')}
              </th>
              <th scope="col" className="py-3.5 px-4 text-end">
                {t('plantCatalog.modal.colAction')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {availabilities.map((avail) => {
              const nurseryName = isArabic ? avail.nurseryNameAr : avail.nurseryNameFr
              const packaging = isArabic ? avail.packagingTypeAr : avail.packagingTypeFr
              const contactSubject = encodeURIComponent(
                `Demande d'information - Plants de ${plantCommonName} (${avail.nurseryNameFr})`,
              )

              return (
                <tr
                  key={avail.nurseryId}
                  className="hover:bg-[var(--surface-secondary)]/50 transition-colors"
                >
                  <td className="py-3.5 px-4 font-medium text-[var(--text-primary)]">
                    <div className="flex items-center gap-2">
                      <Sprout className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                      <span>{nurseryName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[var(--text-secondary)]">
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] bg-[var(--surface-secondary)] px-2.5 py-1 rounded-md">
                      <MapPin className="size-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <span>{avail.wilaya}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-[var(--text-primary)] text-sm">
                        {formatNumber(avail.availableQuantity)}{' '}
                        <span className="text-xs font-normal text-[var(--text-muted)]">
                          {isArabic ? 'شتلة' : 'plants'}
                        </span>
                      </span>
                      <div>{getStatusBadge(avail.status)}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[var(--text-secondary)] hidden sm:table-cell">
                    {packaging}
                  </td>
                  <td className="py-3.5 px-4 text-end">
                    <Link
                      to={`/contact?subject=${contactSubject}&source=catalogue&plant=${encodeURIComponent(
                        plantCommonName,
                      )}&nursery=${encodeURIComponent(avail.nurseryNameFr)}`}
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold',
                        'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all active:scale-95',
                      )}
                    >
                      <PhoneCall className="size-3.5" aria-hidden="true" />
                      <span>{t('plantCatalog.modal.contactNursery')}</span>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Info Notice Box */}
      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-[var(--text-secondary)] flex items-start gap-3">
        <Sprout className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {t('plantCatalog.modal.inquirePlant')} : {plantCommonName} ({scientificName})
          </p>
          <p className="mt-1 text-[var(--text-muted)] leading-relaxed">
            {t('plantCatalog.modal.inquirePlantDesc', { name: plantCommonName })}
          </p>
        </div>
      </div>
    </div>
  )
}
