import type { CSSProperties } from 'react'
import { ArrowUpRight, Sprout } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { Reveal } from '../animation/Reveal'
import { nurseryShowcaseImages } from '../../data/activityPage'
import { nurseries, nurseryAreas } from '../../data/nurseries'
import { productionCapacities } from '../../data/stats'

export function ActivitiesPlantProductionSection() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'ar' ? 'ar-DZ' : 'fr-DZ'
  const maxCapacity = Math.max(...productionCapacities.map((item) => item.capacity))
  const numberFormatter = new Intl.NumberFormat(locale)

  return (
    <section className="section-band section-band-muted activities-plant-section">
      <div className="site-container">
        <div className="grid gap-8 xl:grid-cols-[1.06fr_0.94fr] xl:items-center">
          <div>
            <Reveal className="activities-section-copy">
              <p className="section-eyebrow">{t('activitiesPage.plant.eyebrow')}</p>
              <h2>{t('activitiesPage.plant.title')}</h2>
              <p>{t('activitiesPage.plant.description')}</p>
            </Reveal>

            <div className="activities-plant-metrics">
              <div>
                <strong>
                  <AnimatedCounter value={nurseries.length} locale={locale} />
                </strong>
                <span>{t('stats.nurseries')}</span>
              </div>
              <div>
                <strong>
                  <AnimatedCounter
                    value={nurseryAreas.totalAreaHa}
                    locale={locale}
                    precision={1}
                    suffix=" ha"
                  />
                </strong>
                <span>{t('stats.nurseryTotalArea')}</span>
              </div>
              <div>
                <strong>
                  <AnimatedCounter
                    value={nurseryAreas.irrigatedAreaHa}
                    locale={locale}
                    precision={0}
                    suffix=" ha"
                  />
                </strong>
                <span>{t('stats.irrigatedArea')}</span>
              </div>
            </div>

            <div className="activities-production-panel">
              <div className="activities-production-panel-header">
                <span className="activities-card-icon">
                  <Sprout className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="section-eyebrow">{t('activitiesPage.plant.capacityEyebrow')}</p>
                  <h3>{t('activitiesPage.plant.capacityTitle')}</h3>
                </div>
              </div>

              <div className="activities-production-list">
                {productionCapacities.map((item) => (
                  <div key={item.id} className="activities-production-row">
                    <div>
                      <span>{t(item.labelKey)}</span>
                      <strong>
                        <AnimatedCounter value={item.capacity} locale={locale} />
                      </strong>
                    </div>
                    <span
                      className="activities-production-bar"
                      style={
                        {
                          '--bar-value': `${Math.max((item.capacity / maxCapacity) * 100, 8)}%`,
                        } as CSSProperties
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="activities-production-table-card">
              <div>
                <p className="section-eyebrow">{t('activitiesPage.plant.tableEyebrow')}</p>
                <h3>{t('activitiesPage.plant.tableTitle')}</h3>
              </div>
              <div className="activities-production-table" role="table">
                <div role="row" className="activities-production-table-head">
                  <span role="columnheader">{t('activitiesPage.plant.tableFamily')}</span>
                  <span role="columnheader">{t('activitiesPage.plant.tableCapacity')}</span>
                  <span role="columnheader">
                    <bdi dir="ltr">2023</bdi>
                  </span>
                  <span role="columnheader">
                    <bdi dir="ltr">2024</bdi>
                  </span>
                  <span role="columnheader">
                    <bdi dir="ltr">2025</bdi>
                  </span>
                </div>
                {productionCapacities.map((item) => (
                  <div key={item.id} role="row" className="activities-production-table-row">
                    <span role="cell">{t(item.labelKey)}</span>
                    <span role="cell">
                      <bdi dir="ltr">{numberFormatter.format(item.capacity)}</bdi>
                    </span>
                    <span role="cell">
                      <bdi dir="ltr">{numberFormatter.format(item.yearlyProduction[2023])}</bdi>
                    </span>
                    <span role="cell">
                      <bdi dir="ltr">{numberFormatter.format(item.yearlyProduction[2024])}</bdi>
                    </span>
                    <span role="cell">
                      <bdi dir="ltr">{numberFormatter.format(item.yearlyProduction[2025])}</bdi>
                    </span>
                  </div>
                ))}
              </div>
              <p className="activities-production-table-note">
                {t('activitiesPage.plant.tableNote')}
              </p>
            </div>
          </div>

          <Reveal className="activities-plant-visual" delay={0.08}>
            <div className="activities-plant-photo-grid">
              {nurseryShowcaseImages.map((image) => (
                <figure key={image.id}>
                  <img src={image.src} alt={t(image.altKey)} loading="lazy" decoding="async" />
                  <figcaption>{t(image.labelKey)}</figcaption>
                </figure>
              ))}
            </div>

            <div className="activities-nursery-sites">
              <p className="section-eyebrow">{t('activitiesPage.plant.sitesEyebrow')}</p>
              <div>
                {nurseries.map((nursery) => (
                  <span key={nursery.id}>
                    {i18n.language === 'ar' ? nursery.nameAr : nursery.nameFr}
                  </span>
                ))}
              </div>
              <Link to="/pepinieres" className="premium-button premium-button-secondary">
                <span>{t('activitiesPage.plant.cta')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
