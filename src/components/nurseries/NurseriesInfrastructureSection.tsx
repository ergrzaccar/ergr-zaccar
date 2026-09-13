import { Check, Droplets, Layers, Warehouse } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { nurseryInfrastructures } from '../../data/nurseriesPage'
import { Reveal } from '../animation/Reveal'

const infraIcons = [Droplets, Warehouse, Layers]

export function NurseriesInfrastructureSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-band section-band-muted">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">{t('nurseriesPage.infrastructures.eyebrow')}</p>
          <h2 className="section-title">{t('nurseriesPage.infrastructures.title')}</h2>
          <p className="section-description">{t('nurseriesPage.infrastructures.description')}</p>
        </Reveal>

        <div className="nurseries-infra-grid mt-12">
          {nurseryInfrastructures.map((item, index) => {
            const Icon = infraIcons[index % infraIcons.length]

            return (
              <motion.article
                key={item.id}
                className="nurseries-infra-card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <div className="nurseries-infra-header">
                  <span className="nurseries-infra-icon-box">
                    <Icon className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
                  </span>
                  <div className="nurseries-infra-stat">
                    <span className="nurseries-infra-value">{item.statValue}</span>
                    <span className="nurseries-infra-unit">{item.statUnit}</span>
                  </div>
                </div>

                <h3 className="nurseries-infra-title">{t(item.titleKey)}</h3>
                <p className="nurseries-infra-desc">{t(item.descriptionKey)}</p>

                <ul className="nurseries-infra-features">
                  {item.featureKeys.map((featKey) => (
                    <li key={featKey} className="nurseries-infra-feature-item">
                      <Check className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                      <span>{t(featKey)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
