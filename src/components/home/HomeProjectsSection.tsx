import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, Layers3, Route, Trees } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { projectPreviewItems } from '../../data/home'
import { HomeSectionHeader } from './HomeSectionHeader'

const projectIcons: Record<(typeof projectPreviewItems)[number]['id'], LucideIcon> = {
  'forest-restoration': Trees,
  'tracks-development': Route,
  'watershed-protection': Layers3,
}

export function HomeProjectsSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-band">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <HomeSectionHeader
            eyebrow={t('home.projects.eyebrow')}
            title={t('home.projects.title')}
            description={t('home.projects.description')}
          />
          <Link to="/realisations-projets" className="premium-button premium-button-secondary">
            <span>{t('home.projects.cta')}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="project-preview-grid mt-10">
          {projectPreviewItems.map((item, index) => {
            const Icon = projectIcons[item.id]

            return (
              <motion.article
                key={item.id}
                className="project-preview-card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <figure className="project-preview-media">
                  <img
                    src={item.image.src}
                    alt={t(item.image.altKey)}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="project-preview-body">
                  <span className="project-preview-icon">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="section-eyebrow">{t(item.metaKey)}</p>
                  <h3>{t(item.titleKey)}</h3>
                  <p>{t(item.descriptionKey)}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
