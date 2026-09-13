import { Building2, CheckCircle2, MapPin, ShieldCheck, Truck, Wrench } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { organization } from '../../data/organization'

export function ResourcesMaintenanceParksSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  const parks = organization.equipmentParks

  const maintenanceFeatures = [
    { id: 'feat1', key: 'resourcesPage.maintenance.feature1', icon: Wrench },
    { id: 'feat2', key: 'resourcesPage.maintenance.feature2', icon: ShieldCheck },
    { id: 'feat3', key: 'resourcesPage.maintenance.feature3', icon: Truck },
  ]

  return (
    <section id="maintenance-parks" className="section-band resources-maintenance-section">
      <div className="site-container">
        <div className="resources-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('resourcesPage.maintenance.eyebrow')}</p>
            <h2 className="section-title">{t('resourcesPage.maintenance.title')}</h2>
            <p className="section-lead">{t('resourcesPage.maintenance.description')}</p>
          </Reveal>
        </div>

        {/* 3 Technical Capabilities Pillars */}
        <div className="resources-capabilities-grid">
          {maintenanceFeatures.map((feat, index) => {
            const FeatIcon = feat.icon
            return (
              <Reveal key={feat.id} delay={index * 0.1} className="h-full">
                <div className="resources-capability-pill">
                  <div className="resources-capability-icon-wrap">
                    <FeatIcon className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                  </div>
                  <p className="resources-capability-text">{t(feat.key)}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* 4 Regional Parks Cards */}
        <div className="resources-parks-grid">
          {parks.map((park, index) => (
            <motion.article
              key={park.id}
              className="resources-park-card"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <div className="resources-park-header">
                <span className="resources-park-icon-box">
                  <Building2 className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                </span>
                <span className="resources-park-region-tag">
                  DR {park.regionalDirection.toUpperCase()}
                </span>
              </div>

              <h3 className="resources-park-title">{park.nameFr}</h3>
              <p className="resources-park-sub">
                <MapPin className="size-3.5 text-[var(--brand-primary)] shrink-0 inline-block mr-1" aria-hidden="true" />
                {t('organizationPage.parks.attachedTo')}{' '}
                Direction Régionale {park.regionalDirection.charAt(0).toUpperCase() + park.regionalDirection.slice(1)}
              </p>

              <div className="resources-park-specs">
                <div className="resources-park-spec-item">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t('organizationPage.parks.maintenanceCapability')}</span>
                </div>
                <div className="resources-park-spec-item">
                  <CheckCircle2 className="size-4 text-[var(--technical-blue)] shrink-0" aria-hidden="true" />
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
