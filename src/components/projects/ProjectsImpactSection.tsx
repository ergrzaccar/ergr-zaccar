import type { LucideIcon } from 'lucide-react'
import { MapPin, Route, ShieldCheck, Trees } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimatedCounter } from '../animation/AnimatedCounter'
import { Reveal } from '../animation/Reveal'
import { globalImpactStats } from '../../data/projectsPage'

const impactIcons: Record<string, LucideIcon> = {
  plants: Trees,
  tracks: Route,
  gabions: ShieldCheck,
  wilayas: MapPin,
}

export function ProjectsImpactSection() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'ar' ? 'ar-DZ' : 'fr-DZ'

  return (
    <section id="projects-impact" className="section-band projects-impact-section">
      <div className="site-container">
        <div className="projects-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('projectsPage.impact.eyebrow')}</p>
            <h2 className="section-title">{t('projectsPage.impact.title')}</h2>
            <p className="section-lead">{t('projectsPage.impact.description')}</p>
          </Reveal>
        </div>

        <div className="projects-impact-grid">
          {globalImpactStats.map((stat, index) => {
            const Icon = impactIcons[stat.id] || ShieldCheck

            return (
              <Reveal key={stat.id} delay={index * 0.1} className="h-full">
                <div className="projects-impact-card">
                  <div className="projects-impact-header">
                    <div className="projects-impact-icon-wrap">
                      <Icon className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="projects-impact-content">
                    <div className="projects-impact-number">
                      {stat.prefix}
                      <AnimatedCounter
                        value={stat.value}
                        locale={locale}
                        suffix={stat.suffix}
                      />
                    </div>
                    <h3 className="projects-impact-label">{t(stat.labelKey)}</h3>
                    <p className="projects-impact-desc">{t(stat.descriptionKey)}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
