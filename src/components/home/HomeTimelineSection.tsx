import { History } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { HomeSectionHeader } from './HomeSectionHeader'
import { company } from '../../data/company'

const timelineDescriptionKeys = [
  'home.timeline.items.ontf',
  'home.timeline.items.ordf',
  'home.timeline.items.ergr',
] as const

export function HomeTimelineSection() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const isArabic = i18n.language === 'ar'

  return (
    <section className="section-band">
      <div className="site-container">
        <HomeSectionHeader
          eyebrow={t('home.timeline.eyebrow')}
          title={t('home.timeline.title')}
          description={t('home.timeline.description')}
        />

        <div className="timeline-scroll mt-10" aria-label={t('home.timeline.title')}>
          {company.history.map((item, index) => (
            <motion.article
              key={item.period}
              className="timeline-card"
              initial={shouldReduceMotion ? false : { opacity: 0, x: isArabic ? -28 : 28 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="timeline-marker">
                <History className="size-4" aria-hidden="true" />
              </div>
              <p className="text-sm font-black text-[var(--brand-primary)]">{item.period}</p>
              <h3 className="mt-4 text-xl font-black text-[var(--text-primary)]">
                {isArabic ? item.nameAr : item.nameFr}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {t(timelineDescriptionKeys[index] ?? timelineDescriptionKeys[0])}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
