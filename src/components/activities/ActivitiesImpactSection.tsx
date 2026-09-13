import type { LucideIcon } from 'lucide-react'
import { Droplets, Route, ShieldCheck, Trees } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { Reveal } from '../animation/Reveal'
import { activityImpactPillars, activityImpactStatIds } from '../../data/activityPage'
import { keyStats } from '../../data/stats'

const pillarIcons: Record<(typeof activityImpactPillars)[number]['id'], LucideIcon> = {
  soil: ShieldCheck,
  water: Droplets,
  forest: Trees,
  access: Route,
}

export function ActivitiesImpactSection() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const locale = i18n.language === 'ar' ? 'ar-DZ' : 'fr-DZ'
  const impactStats = activityImpactStatIds
    .map((id) => keyStats.find((stat) => stat.id === id))
    .filter((stat): stat is (typeof keyStats)[number] => stat !== undefined)

  return (
    <section className="section-band activities-impact-section">
      <div className="site-container">
        <div className="activities-impact-panel">
          <div className="activities-impact-map" aria-hidden="true">
            <span className="activities-impact-line activities-impact-line-1" />
            <span className="activities-impact-line activities-impact-line-2" />
            <span className="activities-impact-line activities-impact-line-3" />
            <span className="activities-impact-node activities-impact-node-1" />
            <span className="activities-impact-node activities-impact-node-2" />
            <span className="activities-impact-node activities-impact-node-3" />
          </div>

          <div className="relative grid gap-10 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
            <Reveal className="activities-section-copy">
              <p className="section-eyebrow">{t('activitiesPage.impact.eyebrow')}</p>
              <h2>{t('activitiesPage.impact.title')}</h2>
              <p>{t('activitiesPage.impact.description')}</p>

              <div className="activities-impact-stats">
                {impactStats.map((stat) => (
                  <div key={stat.id}>
                    <strong>
                      <AnimatedCounter
                        value={stat.value}
                        locale={locale}
                        precision={stat.value % 1 === 0 ? 0 : 1}
                        suffix={'unit' in stat && stat.unit ? ` ${stat.unit}` : ''}
                      />
                    </strong>
                    <span>{t(stat.labelKey)}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="activities-impact-grid">
              {activityImpactPillars.map((pillar, index) => {
                const Icon = pillarIcons[pillar.id]

                return (
                  <motion.article
                    key={pillar.id}
                    className="activities-impact-card"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                  >
                    <span className="activities-card-icon">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3>{t(pillar.titleKey)}</h3>
                    <p>{t(pillar.descriptionKey)}</p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
