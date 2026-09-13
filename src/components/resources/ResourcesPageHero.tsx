import { ArrowUpRight, CheckCircle2, Truck, Users } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'
import { resourcesHeroMedia, resourcesHeroProofKeys } from '../../data/resourcesPage'

export function ResourcesPageHero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="resources-page-hero">
      <TopographicBackground className="opacity-70" />
      <div className="site-container relative">
        <div className="resources-hero-grid">
          <Reveal className="resources-hero-copy">
            <p className="section-eyebrow">{t('pages.resources.eyebrow')}</p>
            <h1>{t('resourcesPage.hero.title')}</h1>
            <p className="resources-hero-lead">{t('resourcesPage.hero.description')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#fleet-inventory" className="premium-button">
                <span>{t('resourcesPage.hero.primaryCta')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#human-capital" className="premium-button premium-button-secondary">
                <span>{t('resourcesPage.hero.secondaryCta')}</span>
                <Users className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="resources-hero-proof">
              {resourcesHeroProofKeys.map((proofKey) => (
                <span key={proofKey} className="resources-proof-badge">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t(proofKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="resources-hero-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="resources-hero-dossier-card">
              <span className="resources-card-icon">
                <Truck className="size-5" aria-hidden="true" />
              </span>
              <p className="section-eyebrow">{t('resourcesPage.hero.dossierEyebrow')}</p>
              <h2>{t('resourcesPage.hero.dossierTitle')}</h2>
              <p>{t('resourcesPage.hero.dossierText')}</p>
            </div>

            <div className="resources-hero-dossier-media">
              {resourcesHeroMedia.map((media, index) => (
                <figure
                  key={media.id}
                  className={index === 0 ? 'resources-hero-photo-primary' : ''}
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
