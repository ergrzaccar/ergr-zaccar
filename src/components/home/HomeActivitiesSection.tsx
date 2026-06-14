import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, Flame, Mountain, Route, Sprout, Trees } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { HomeSectionHeader } from './HomeSectionHeader'
import { activities } from '../../data/activities'
import { featuredActivityIds } from '../../data/home'

const activityIcons: Partial<Record<(typeof activities)[number]['id'], LucideIcon>> = {
  'land-development-watersheds': Route,
  'plant-production': Sprout,
  'forest-heritage-restoration': Trees,
  'forestry-engineering': Mountain,
  'forest-maintenance': Flame,
} as const

export function HomeActivitiesSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const featuredActivities = featuredActivityIds
    .map((id) => activities.find((activity) => activity.id === id))
    .filter((activity) => activity !== undefined)

  return (
    <section className="section-band section-band-muted">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <HomeSectionHeader
            eyebrow={t('home.expertise.eyebrow')}
            title={t('home.expertise.title')}
            description={t('home.expertise.description')}
          />
          <Link
            to="/domaines-activite"
            className="premium-button premium-button-secondary shrink-0"
          >
            <span>{t('home.expertise.cta')}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredActivities.map((activity, index) => {
            const Icon = activityIcons[activity.id] ?? Trees
            const scopeKeys = 'scopeKeys' in activity ? activity.scopeKeys : undefined

            return (
              <motion.article
                key={activity.id}
                className="activity-card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className="activity-card-icon">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-black text-[var(--text-primary)]">
                  {t(activity.titleKey)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {t(activity.descriptionKey)}
                </p>
                {scopeKeys && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {scopeKeys.slice(0, 3).map((scopeKey) => (
                      <span key={scopeKey} className="scope-chip">
                        {t(scopeKey)}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
