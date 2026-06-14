import { ArrowUpRight, Building2, Factory, MapPinned, Sprout } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { HomeSectionHeader } from './HomeSectionHeader'
import { TerritoryMap } from './TerritoryMap'
import { organization } from '../../data/organization'

export function HomeTerritorySection() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const isArabic = i18n.language === 'ar'

  return (
    <section className="section-band">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <HomeSectionHeader
            eyebrow={t('home.territoryV2.eyebrow')}
            title={t('home.territoryV2.title')}
            description={t('home.territoryV2.description')}
          />
          <Link to="/organisation-implantation" className="premium-button premium-button-secondary">
            <span>{t('home.territoryV2.cta')}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10">
          <TerritoryMap />
        </div>

        <div className="regional-card-grid mt-5">
          {organization.regionalDirections.map((direction, index) => (
            <motion.article
              key={direction.id}
              className="regional-card"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.48, delay: index * 0.07 }}
            >
              <div className="flex items-start gap-4">
                <span className="regional-card-icon">
                  <Building2 className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-black text-[var(--text-primary)]">
                    {isArabic ? direction.nameAr : direction.nameFr}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {t('home.territoryV2.headquarters', { location: direction.headquarters })}
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="regional-metric">
                  <MapPinned className="size-4" aria-hidden="true" />
                  <span>{direction.wilayas.join(' / ')}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="regional-metric">
                    <Factory className="size-4" aria-hidden="true" />
                    <span>
                      {t(
                        direction.units.length > 1
                          ? 'home.territoryV2.unitsPlural'
                          : 'home.territoryV2.unitsSingular',
                        { count: direction.units.length },
                      )}
                    </span>
                  </div>
                  <div className="regional-metric">
                    <Sprout className="size-4" aria-hidden="true" />
                    <span>
                      {t(
                        direction.equipmentParks.length > 1
                          ? 'home.territoryV2.parksPlural'
                          : 'home.territoryV2.parksSingular',
                        { count: direction.equipmentParks.length },
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
