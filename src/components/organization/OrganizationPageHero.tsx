import { ArrowUpRight, Building2, CheckCircle2 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'
import { organizationHeroMedia, organizationHeroProofKeys } from '../../data/organizationPage'

export function OrganizationPageHero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="organization-page-hero">
      <TopographicBackground className="opacity-70" />
      <div className="site-container relative">
        <div className="organization-hero-grid">
          <Reveal className="organization-hero-copy">
            <p className="section-eyebrow">{t('pages.organization.eyebrow')}</p>
            <h1>{t('organizationPage.hero.title')}</h1>
            <p className="organization-hero-lead">{t('organizationPage.hero.description')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#regional-structure" className="premium-button">
                <span>{t('organizationPage.hero.primaryCta')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#territorial-units" className="premium-button premium-button-secondary">
                <span>{t('organizationPage.hero.secondaryCta')}</span>
                <Building2 className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="organization-hero-proof">
              {organizationHeroProofKeys.map((proofKey) => (
                <span key={proofKey} className="organization-proof-badge">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t(proofKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="organization-hero-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="organization-hero-dossier-card">
              <span className="organization-card-icon">
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <p className="section-eyebrow">{t('organizationPage.hero.dossierEyebrow')}</p>
              <h2>{t('organizationPage.hero.dossierTitle')}</h2>
              <p>{t('organizationPage.hero.dossierText')}</p>
            </div>

            <div className="organization-hero-dossier-media">
              {organizationHeroMedia.map((media, index) => (
                <figure
                  key={media.id}
                  className={index === 0 ? 'organization-hero-photo-primary' : ''}
                >
                  <img
                    src={media.src}
                    alt={t(media.altKey)}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <figcaption>{t(media.labelKey)}</figcaption>
                </figure>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
