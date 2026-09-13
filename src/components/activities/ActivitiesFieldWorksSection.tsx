import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { activityFieldWorks } from '../../data/activityPage'

export function ActivitiesFieldWorksSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-band section-band-muted">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-3xl">
            <p className="section-eyebrow">{t('activitiesPage.fieldWorks.eyebrow')}</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-normal text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {t('activitiesPage.fieldWorks.title')}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {t('activitiesPage.fieldWorks.description')}
            </p>
          </Reveal>

          <Reveal className="activities-field-note" delay={0.08}>
            <span>{t('activitiesPage.fieldWorks.noteLabel')}</span>
            <strong>{t('activitiesPage.fieldWorks.noteValue')}</strong>
          </Reveal>
        </div>

        <div className="activities-field-grid mt-10">
          {activityFieldWorks.map((item, index) => (
            <motion.article
              key={item.id}
              className={
                index === 0
                  ? 'activities-field-card activities-field-card-large'
                  : 'activities-field-card'
              }
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <figure>
                <img
                  src={item.image.src}
                  alt={t(item.image.altKey)}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{t(item.image.labelKey)}</figcaption>
              </figure>
              <div className="activities-field-body">
                <p className="section-eyebrow">{t(item.metaKey)}</p>
                <h3>{t(item.titleKey)}</h3>
                <p>{t(item.descriptionKey)}</p>
                <div className="activities-chip-row">
                  {item.tagKeys.map((tagKey) => (
                    <span key={tagKey} className="scope-chip">
                      {t(tagKey)}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
