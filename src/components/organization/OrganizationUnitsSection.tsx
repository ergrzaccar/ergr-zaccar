import { HardHat, MapPin, ShieldCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { organization } from '../../data/organizationPage'
import { Reveal } from '../animation/Reveal'

export function OrganizationUnitsSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  const units = organization.implementationUnits

  return (
    <section id="territorial-units" className="section-band section-band-muted">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">{t('organizationPage.units.eyebrow')}</p>
          <h2 className="section-title">{t('organizationPage.units.title')}</h2>
          <p className="section-description">{t('organizationPage.units.description')}</p>
        </Reveal>

        <div className="organization-units-grid mt-12">
          {units.map((unit, index) => {
            const isDgAttached = 'attachedTo' in unit && unit.attachedTo === 'general-direction'

            return (
              <motion.article
                key={unit.id}
                className="organization-unit-card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
              >
                <div className="organization-unit-header">
                  <div>
                    <span className="organization-unit-badge">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      <span>{t('organizationPage.units.wilayaPrefix')} {unit.nameFr.replace('Unité ', '')}</span>
                    </span>
                    <h3 className="organization-unit-title">{unit.nameFr}</h3>
                  </div>
                  {isDgAttached && (
                    <span className="organization-dg-pill">
                      {t('organizationPage.units.attachedBadge')}
                    </span>
                  )}
                </div>

                <div className="organization-unit-sections">
                  <div className="organization-unit-section-item">
                    <HardHat className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                    <span>{t('organizationPage.units.technicalSection')}</span>
                  </div>
                  <div className="organization-unit-section-item">
                    <ShieldCheck className="size-4 text-[var(--technical-blue)] shrink-0" aria-hidden="true" />
                    <span>{t('organizationPage.units.adminSection')}</span>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
