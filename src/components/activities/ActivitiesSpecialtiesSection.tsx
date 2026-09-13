import type { LucideIcon } from 'lucide-react'
import { Flame, Leaf, Mountain, Route, ShieldCheck, Sprout } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { technicalDomains } from '../../data/activityPage'

const domainIcons: Record<(typeof technicalDomains)[number]['id'], LucideIcon> = {
  'forest-restoration': Leaf,
  watersheds: Mountain,
  tracks: Route,
  'forestry-works': Flame,
  'plant-production': Sprout,
  'desertification-green-spaces': ShieldCheck,
}

export function ActivitiesSpecialtiesSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-band activities-specialties-section">
      <div className="site-container">
        <div className="activities-domain-intro">
          <Reveal className="activities-section-copy">
            <p className="section-eyebrow">{t('activitiesPage.intro.eyebrow')}</p>
            <h2>{t('activitiesPage.intro.title')}</h2>
            <p>{t('activitiesPage.intro.description')}</p>
          </Reveal>

          <Reveal className="activities-domain-note" delay={0.08}>
            <span>{t('activitiesPage.intro.noteLabel')}</span>
            <strong>{t('activitiesPage.intro.noteValue')}</strong>
            <p>{t('activitiesPage.intro.noteText')}</p>
          </Reveal>
        </div>

        <div className="mt-12">
          <Reveal className="max-w-3xl">
            <p className="section-eyebrow">{t('activitiesPage.technicalDomains.eyebrow')}</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-normal text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {t('activitiesPage.technicalDomains.title')}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {t('activitiesPage.technicalDomains.description')}
            </p>
          </Reveal>

          <div className="activities-technical-domain-list mt-9">
            {technicalDomains.map((domain, index) => {
              const Icon = domainIcons[domain.id]
              const domainDetails = [
                { id: 'objective', valueKey: domain.objectiveKey },
                { id: 'works', valueKey: domain.worksKey },
                { id: 'means', valueKey: domain.meansKey },
                { id: 'impact', valueKey: domain.impactKey },
                { id: 'examples', valueKey: domain.examplesKey },
              ] as const

              return (
                <motion.article
                  key={domain.id}
                  className="activities-technical-domain-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <figure>
                    <img
                      src={domain.image.src}
                      alt={t(domain.image.altKey)}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{t(domain.image.labelKey)}</figcaption>
                  </figure>

                  <div className="activities-technical-domain-body">
                    <div className="activities-technical-domain-title">
                      <span className="activities-card-icon">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3>{t(domain.titleKey)}</h3>
                    </div>

                    <div className="activities-technical-detail-grid">
                      {domainDetails.map((detail) => (
                        <section key={detail.id}>
                          <h4>{t(`activitiesPage.detailLabels.${detail.id}`)}</h4>
                          <p>{t(detail.valueKey)}</p>
                        </section>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
