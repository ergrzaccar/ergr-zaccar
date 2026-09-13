import { Compass, Truck, Wrench } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { organization } from '../../data/organizationPage'
import { Reveal } from '../animation/Reveal'

export function OrganizationParksSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  const parks = organization.equipmentParks

  return (
    <section className="section-band">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">{t('organizationPage.parks.eyebrow')}</p>
          <h2 className="section-title">{t('organizationPage.parks.title')}</h2>
          <p className="section-description">{t('organizationPage.parks.description')}</p>
        </Reveal>

        <div className="organization-parks-grid mt-12">
          {parks.map((park, index) => (
            <motion.article
              key={park.id}
              className="organization-park-card"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <div className="organization-park-header">
                <span className="organization-park-icon-box">
                  <Truck className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                </span>
                <span className="organization-park-region-tag">
                  DR {park.regionalDirection.toUpperCase()}
                </span>
              </div>

              <h3 className="organization-park-title">{park.nameFr}</h3>
              <p className="organization-park-sub">
                {t('organizationPage.parks.attachedTo')} Direction Régionale {park.regionalDirection.charAt(0).toUpperCase() + park.regionalDirection.slice(1)}
              </p>

              <div className="organization-park-specs">
                <div className="organization-park-spec-item">
                  <Wrench className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t('organizationPage.parks.maintenanceCapability')}</span>
                </div>
                <div className="organization-park-spec-item">
                  <Compass className="size-4 text-[var(--technical-blue)] shrink-0" aria-hidden="true" />
                  <span>{t('organizationPage.parks.deploymentRadius')}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
