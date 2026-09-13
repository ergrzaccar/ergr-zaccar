import type { LucideIcon } from 'lucide-react'
import { Flame, ShieldAlert, Snowflake, Waves } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { emergencyInterventions } from '../../data/resourcesPage'

const interventionIcons: Record<string, LucideIcon> = {
  Flame,
  Snowflake,
  Waves,
}

const themeClasses: Record<string, { badge: string; iconBox: string }> = {
  'fire-fighting': {
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    iconBox: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  'winter-clearance': {
    badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    iconBox: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  },
  'flood-protection': {
    badge: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    iconBox: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  },
}

export function ResourcesInterventionSection() {
  const { t } = useTranslation()

  return (
    <section id="emergency-interventions" className="section-band resources-intervention-section">
      <div className="site-container">
        <div className="resources-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('resourcesPage.interventions.eyebrow')}</p>
            <h2 className="section-title">{t('resourcesPage.interventions.title')}</h2>
            <p className="section-lead">{t('resourcesPage.interventions.description')}</p>
          </Reveal>
        </div>

        <div className="resources-intervention-grid">
          {emergencyInterventions.map((item, index) => {
            const Icon = interventionIcons[item.iconName] || ShieldAlert
            const theme = themeClasses[item.id] || {
              badge: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
              iconBox: 'bg-emerald-500/10 text-emerald-600',
            }

            return (
              <Reveal key={item.id} delay={index * 0.1} className="h-full">
                <article className="resources-intervention-card">
                  <div className="resources-intervention-top">
                    <div className={`resources-intervention-icon ${theme.iconBox}`}>
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <span className={`resources-intervention-badge ${theme.badge}`}>
                      {t('resourcesPage.interventions.eyebrow')}
                    </span>
                  </div>

                  <h3 className="resources-intervention-title">{t(item.titleKey)}</h3>
                  <p className="resources-intervention-desc">{t(item.descriptionKey)}</p>

                  <div className="resources-intervention-action">
                    <ShieldAlert className="size-4 shrink-0 text-[var(--brand-primary)]" aria-hidden="true" />
                    <span>{t(item.actionKey)}</span>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
