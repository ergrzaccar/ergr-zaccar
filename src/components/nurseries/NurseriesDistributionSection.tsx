import { Building, Factory, Shield, Sprout } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { nurseryDistributionPartners } from '../../data/nurseriesPage'
import { Reveal } from '../animation/Reveal'

const partnerIcons = [Shield, Building, Sprout, Factory]

export function NurseriesDistributionSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-band">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">{t('nurseriesPage.distribution.eyebrow')}</p>
          <h2 className="section-title">{t('nurseriesPage.distribution.title')}</h2>
          <p className="section-description">{t('nurseriesPage.distribution.description')}</p>
        </Reveal>

        <div className="nurseries-distribution-grid mt-12">
          {nurseryDistributionPartners.map((partner, index) => {
            const Icon = partnerIcons[index % partnerIcons.length]

            return (
              <motion.article
                key={partner.id}
                className="nurseries-partner-card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <div className="nurseries-partner-header">
                  <span className="nurseries-partner-icon-box">
                    <Icon className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                  </span>
                  <span className="nurseries-partner-tag">{t(partner.tagKey)}</span>
                </div>

                <h3 className="nurseries-partner-title">{t(partner.titleKey)}</h3>
                <p className="nurseries-partner-desc">{t(partner.descriptionKey)}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
