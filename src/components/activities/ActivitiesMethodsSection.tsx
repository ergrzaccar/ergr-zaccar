import type { LucideIcon } from 'lucide-react'
import { ClipboardCheck, FileSearch, HardHat, Ruler } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { interventionMethodSteps } from '../../data/activityPage'

const methodIcons: Record<(typeof interventionMethodSteps)[number]['id'], LucideIcon> = {
  diagnosis: FileSearch,
  preparation: Ruler,
  execution: HardHat,
  control: ClipboardCheck,
}

export function ActivitiesMethodsSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-band section-band-muted activities-methods-section">
      <div className="site-container">
        <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
          <Reveal className="activities-section-copy">
            <p className="section-eyebrow">{t('activitiesPage.methods.eyebrow')}</p>
            <h2>{t('activitiesPage.methods.title')}</h2>
            <p>{t('activitiesPage.methods.description')}</p>
          </Reveal>

          <div className="activities-method-timeline">
            {interventionMethodSteps.map((step, index) => {
              const Icon = methodIcons[step.id]

              return (
                <motion.article
                  key={step.id}
                  className="activities-method-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.42, delay: index * 0.05 }}
                >
                  <span className="activities-method-index">
                    <bdi dir="ltr">{String(index + 1).padStart(2, '0')}</bdi>
                  </span>
                  <span className="activities-card-icon">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{t(step.titleKey)}</h3>
                    <p>{t(step.descriptionKey)}</p>
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
