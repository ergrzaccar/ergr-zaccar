import { Building2, Factory, MapPinned, Tractor, Warehouse } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { HomeSectionHeader } from './HomeSectionHeader'
import { equipment, equipmentInventory } from '../../data/equipment'
import { featuredEquipmentIds, operationalCapacityMedia } from '../../data/home'
import { organization } from '../../data/organization'

export function HomeCapabilitiesSection() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const locale = i18n.language === 'ar' ? 'ar-DZ' : 'fr-DZ'
  const featuredEquipment = featuredEquipmentIds
    .map((id) => equipmentInventory.find((item) => item.id === id))
    .filter((item) => item !== undefined)

  return (
    <section className="section-band section-band-muted">
      <div className="site-container">
        <HomeSectionHeader
          eyebrow={t('home.operationalCapacity.eyebrow')}
          title={t('home.operationalCapacity.title')}
          description={t('home.operationalCapacity.description')}
          align="center"
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.article
            className="capability-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-eyebrow">{t('home.operationalCapacity.equipmentEyebrow')}</p>
                <h3 className="mt-3 text-3xl font-black text-[var(--text-primary)]">
                  <AnimatedCounter value={equipment.totalInventoriedItems} locale={locale} />
                </h3>
                <p className="mt-2 text-sm font-bold text-[var(--text-secondary)]">
                  {t('home.operationalCapacity.equipmentLabel')}
                </p>
              </div>
              <span className="capability-icon">
                <Tractor className="size-6" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-8 grid gap-3">
              {featuredEquipment.map((item) => (
                <div key={item.id} className="equipment-row">
                  <span>{t(item.labelKey)}</span>
                  <strong>
                    <AnimatedCounter value={item.count} locale={locale} />
                  </strong>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="capability-panel capability-panel-visual"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">{t('home.operationalCapacity.networkEyebrow')}</p>
                  <h3 className="mt-3 text-2xl font-black text-[var(--text-primary)]">
                    {t('home.operationalCapacity.networkTitle')}
                  </h3>
                </div>
                <span className="capability-icon">
                  <MapPinned className="size-6" aria-hidden="true" />
                </span>
              </div>

              <div className="operational-proof-grid mt-8">
                <div className="production-card">
                  <Building2 className="size-4 text-[var(--technical-blue)]" aria-hidden="true" />
                  <p className="mt-4 text-2xl font-black text-[var(--text-primary)]">
                    <AnimatedCounter
                      value={organization.regionalDirections.length}
                      locale={locale}
                    />
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[var(--text-secondary)]">
                    {t('stats.regionalDirections')}
                  </p>
                </div>
                <div className="production-card">
                  <Factory className="size-4 text-[var(--technical-blue)]" aria-hidden="true" />
                  <p className="mt-4 text-2xl font-black text-[var(--text-primary)]">
                    <AnimatedCounter
                      value={organization.implementationUnits.length}
                      locale={locale}
                    />
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[var(--text-secondary)]">
                    {t('stats.implementationUnits')}
                  </p>
                </div>
                <div className="production-card">
                  <Warehouse className="size-4 text-[var(--technical-blue)]" aria-hidden="true" />
                  <p className="mt-4 text-2xl font-black text-[var(--text-primary)]">
                    <AnimatedCounter value={organization.equipmentParks.length} locale={locale} />
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[var(--text-secondary)]">
                    {t('stats.equipmentParks')}
                  </p>
                </div>
              </div>

              <div className="capability-photo-strip mt-5">
                {operationalCapacityMedia.map((media) => (
                  <figure key={media.id}>
                    <img src={media.src} alt={t(media.altKey)} loading="lazy" decoding="async" />
                    <figcaption>{t(media.labelKey)}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
