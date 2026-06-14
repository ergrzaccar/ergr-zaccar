import { Gauge, Sprout } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { nurseryLandingMedia } from '../../data/home'
import { nurseryAreas, nurseries } from '../../data/nurseries'
import { productionCapacities } from '../../data/stats'
import { HomeSectionHeader } from './HomeSectionHeader'

export function HomeNurseriesSection() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const isArabic = i18n.language === 'ar'
  const locale = isArabic ? 'ar-DZ' : 'fr-DZ'
  const totalCapacity = productionCapacities.reduce((total, item) => total + item.capacity, 0)

  return (
    <section className="section-band section-band-muted">
      <div className="site-container">
        <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
          <div>
            <HomeSectionHeader
              eyebrow={t('home.nurseryLanding.eyebrow')}
              title={t('home.nurseryLanding.title')}
              description={t('home.nurseryLanding.description')}
            />

            <div className="nursery-impact-panel mt-8">
              <Sprout className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
              <div>
                <p className="text-3xl font-black text-[var(--text-primary)]">
                  <AnimatedCounter
                    value={totalCapacity / 1_000_000}
                    locale={locale}
                    suffix=" M"
                    precision={2}
                  />
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-[var(--text-secondary)]">
                  {t('home.nurseryLanding.capacityLabel')}
                </p>
              </div>
            </div>

            <div className="nursery-photo-mosaic mt-5">
              {nurseryLandingMedia.map((media, index) => (
                <figure key={media.id} className={index === 0 ? 'nursery-photo-primary' : ''}>
                  <img src={media.src} alt={t(media.altKey)} loading="lazy" decoding="async" />
                  <figcaption>{t(media.labelKey)}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="nursery-metrics-grid">
              <article className="production-card">
                <Gauge className="size-4 text-[var(--technical-blue)]" aria-hidden="true" />
                <p className="mt-4 text-2xl font-black text-[var(--text-primary)]">
                  <AnimatedCounter
                    value={nurseryAreas.totalAreaHa}
                    locale={locale}
                    suffix=" ha"
                    precision={1}
                  />
                </p>
                <p className="mt-2 text-sm font-bold text-[var(--text-secondary)]">
                  {t('stats.nurseryTotalArea')}
                </p>
              </article>
              <article className="production-card">
                <Gauge className="size-4 text-[var(--technical-blue)]" aria-hidden="true" />
                <p className="mt-4 text-2xl font-black text-[var(--text-primary)]">
                  <AnimatedCounter
                    value={nurseryAreas.irrigatedAreaHa}
                    locale={locale}
                    suffix=" ha"
                  />
                </p>
                <p className="mt-2 text-sm font-bold text-[var(--text-secondary)]">
                  {t('stats.irrigatedArea')}
                </p>
              </article>
            </div>

            <div className="nursery-list-panel">
              {nurseries.map((nursery, index) => (
                <motion.span
                  key={nursery.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.32, delay: index * 0.025 }}
                >
                  <strong>{isArabic ? nursery.nameAr : nursery.nameFr}</strong>
                  <small>{nursery.wilaya}</small>
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
