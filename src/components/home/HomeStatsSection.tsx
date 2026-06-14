import { ArrowUpRight, BarChart3, Landmark, Sprout, Tractor, Trees } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { Reveal } from '../animation/Reveal'
import { HomeSectionHeader } from './HomeSectionHeader'
import { featuredStatIds } from '../../data/home'
import { organization } from '../../data/organization'
import { keyStats } from '../../data/stats'

const statIcons = {
  'share-capital': Landmark,
  'implementation-units': BarChart3,
  nurseries: Sprout,
  'equipment-parks': Tractor,
  'nursery-total-area': Sprout,
  'irrigated-area': Trees,
} as const

export function HomeStatsSection() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'ar' ? 'ar-DZ' : 'fr-DZ'
  const isArabic = i18n.language === 'ar'
  const stats = featuredStatIds
    .map((id) => keyStats.find((stat) => stat.id === id))
    .filter((stat) => stat !== undefined)

  return (
    <section className="section-band stats-section">
      <div className="site-container grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
        <div className="stats-copy-column">
          <HomeSectionHeader
            eyebrow={t('home.stats.eyebrow')}
            title={t('home.stats.title')}
            description={t('home.stats.description')}
          />
          <Reveal delay={0.08}>
            <div className="stats-detail-panel mt-8">
              <p className="section-eyebrow">{t('home.stats.structureEyebrow')}</p>
              <div className="mt-5 grid gap-3">
                {organization.regionalDirections.map((direction) => (
                  <div key={direction.id} className="stats-direction-row">
                    <span>
                      {isArabic
                        ? direction.nameAr
                        : direction.nameFr.replace('Direction Régionale ', 'DR ')}
                    </span>
                    <strong>{direction.wilayas.join(' / ')}</strong>
                  </div>
                ))}
              </div>
              <Link to="/organisation-implantation" className="stats-inline-link">
                <span>{t('home.stats.territoryLink')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="stats-grid-panel">
          <div className="stats-card-grid">
            {stats.map((stat) => {
              const Icon = statIcons[stat.id as keyof typeof statIcons]
              const isCapital = stat.id === 'share-capital'
              const unit = 'unit' in stat ? stat.unit : undefined
              const displayValue = 'displayValue' in stat ? stat.displayValue : undefined

              return (
                <article key={stat.id} className="stat-card">
                  <Icon className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                  <p className="mt-5 text-3xl font-black text-[var(--text-primary)]">
                    {isCapital && displayValue ? (
                      <bdi dir="ltr">{displayValue}</bdi>
                    ) : (
                      <AnimatedCounter
                        value={stat.value}
                        locale={locale}
                        suffix={unit ? ` ${unit}` : ''}
                        precision={stat.value % 1 === 0 ? 0 : 1}
                      />
                    )}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[var(--text-secondary)]">
                    {t(stat.labelKey)}
                  </p>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
