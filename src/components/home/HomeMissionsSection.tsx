import type { LucideIcon } from 'lucide-react'
import { Flame, Leaf, Mountain, Route, ShieldCheck, Sprout } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { fieldMissionItems } from '../../data/home'
import { HomeSectionHeader } from './HomeSectionHeader'

const missionIcons: Record<(typeof fieldMissionItems)[number]['id'], LucideIcon> = {
  reforestation: Leaf,
  'rural-tracks': Route,
  watersheds: Mountain,
  firebreaks: Flame,
  'plant-production': Sprout,
  'green-valorization': ShieldCheck,
}

export function HomeMissionsSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-band">
      <div className="site-container">
        <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
          <div className="missions-intro">
            <HomeSectionHeader
              eyebrow={t('home.missions.eyebrow')}
              title={t('home.missions.title')}
              description={t('home.missions.description')}
            />
            <div className="mission-proof mt-8">
              <span>{t('home.missions.proofLabel')}</span>
              <strong>{t('home.missions.proofValue')}</strong>
            </div>
          </div>

          <div className="mission-grid">
            {fieldMissionItems.map((item, index) => {
              const Icon = missionIcons[item.id]

              return (
                <motion.article
                  key={item.id}
                  className="mission-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <figure className="mission-card-media">
                    <img
                      src={item.image.src}
                      alt={t(item.image.altKey)}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{t(item.image.labelKey)}</figcaption>
                    <span className="mission-card-icon">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </figure>
                  <div className="mission-card-body">
                    <p className="mission-card-detail">{t(item.detailKey)}</p>
                    <h3>{t(item.titleKey)}</h3>
                    <p>{t(item.descriptionKey)}</p>
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
