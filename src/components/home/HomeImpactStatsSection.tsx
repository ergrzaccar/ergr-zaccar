import { BarChart3, Landmark, Sprout, Tractor, Trees } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { Reveal } from '../animation/Reveal'
import { featuredStatIds } from '../../data/home'
import { keyStats, productionCapacities } from '../../data/stats'
import { HomeSectionHeader } from './HomeSectionHeader'

const statIcons = {
  'share-capital': Landmark,
  'implementation-units': BarChart3,
  nurseries: Sprout,
  'equipment-parks': Tractor,
  'nursery-total-area': Sprout,
  'irrigated-area': Trees,
} as const

export function HomeImpactStatsSection() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'ar' ? 'ar-DZ' : 'fr-DZ'
  const stats = featuredStatIds
    .map((id) => keyStats.find((stat) => stat.id === id))
    .filter((stat) => stat !== undefined)
  const totalPlantCapacity = productionCapacities.reduce((total, item) => total + item.capacity, 0)

  return (
    <section className="section-band stats-section">
      <div className="site-container grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
        <div className="stats-copy-column">
          <HomeSectionHeader
            eyebrow={t('home.impact.eyebrow')}
            title={t('home.impact.title')}
            description={t('home.impact.description')}
          />
          <Reveal delay={0.08}>
            <div className="impact-proof-panel mt-8">
              <p className="section-eyebrow">{t('home.impact.capacityEyebrow')}</p>
              <p className="mt-4 text-4xl font-black text-[var(--text-primary)]">
                <AnimatedCounter
                  value={totalPlantCapacity / 1_000_000}
                  locale={locale}
                  suffix=" M"
                  precision={2}
                />
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-[var(--text-secondary)]">
                {t('home.impact.capacityText')}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="stats-grid-panel">
          <div className="stats-card-grid">
            {stats.map((stat) => {
              const Icon = statIcons[stat.id as keyof typeof statIcons]
              const isCapital = stat.id === 'share-capital'
              const unit = 'unit' in stat ? stat.unit : undefined

              return (
                <article key={stat.id} className="stat-card">
                  <Icon className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                  <p className="mt-5 text-3xl font-black text-[var(--text-primary)]">
                    {isCapital ? (
                      <AnimatedCounter
                        value={stat.value / 1_000_000}
                        locale={locale}
                        suffix=" M DA"
                        precision={1}
                      />
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
