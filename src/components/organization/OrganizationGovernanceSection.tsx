import { Building2, Network, Wrench } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { centralDirectorates, governanceLevels } from '../../data/organizationPage'
import { Reveal } from '../animation/Reveal'

const levelIcons = {
  Building2,
  Network,
  Wrench,
}

export function OrganizationGovernanceSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-band section-band-muted">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">{t('organizationPage.governance.eyebrow')}</p>
          <h2 className="section-title">{t('organizationPage.governance.title')}</h2>
          <p className="section-description">{t('organizationPage.governance.description')}</p>
        </Reveal>

        {/* 3 Governance Levels */}
        <div className="organization-levels-grid mt-12">
          {governanceLevels.map((lvl, index) => {
            const Icon = levelIcons[lvl.iconName as keyof typeof levelIcons] || Building2

            return (
              <motion.article
                key={lvl.id}
                className="organization-level-card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="organization-level-header">
                  <span className="organization-level-icon">
                    <Icon className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                  </span>
                  <span className="organization-level-number">{lvl.levelNumber}</span>
                </div>
                <h3 className="organization-level-title">{t(lvl.titleKey)}</h3>
                <p className="organization-level-desc">{t(lvl.descriptionKey)}</p>
                <div className="organization-level-footer">
                  <p>{t(lvl.detailsKey)}</p>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Central Entities of the Direction Générale */}
        <div className="organization-central-panel mt-12">
          <div className="organization-central-header">
            <span className="organization-central-badge">Direction Générale / Rouiba</span>
            <h3 className="organization-central-title">
              {t('organizationPage.governance.centralEntitiesTitle')}
            </h3>
          </div>

          <div className="organization-directorates-grid mt-6">
            {centralDirectorates.map((item, index) => (
              <motion.div
                key={item.id}
                className="organization-directorate-pill"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <span className="organization-directorate-code">{item.code}</span>
                <div>
                  <h4 className="organization-directorate-title">{t(item.titleKey)}</h4>
                  <p className="organization-directorate-desc">{t(item.descriptionKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
