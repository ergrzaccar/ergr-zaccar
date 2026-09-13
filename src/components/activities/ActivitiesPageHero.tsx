import { ArrowUpRight, ClipboardCheck, MapPinned } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'
import { activityHeroMedia, activityHeroProofKeys } from '../../data/activityPage'

export function ActivitiesPageHero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="activities-page-hero">
      <TopographicBackground className="opacity-70" />
      <div className="site-container relative">
        <div className="activities-hero-grid activities-hero-grid-technical">
          <Reveal className="activities-hero-copy">
            <p className="section-eyebrow">{t('pages.activities.eyebrow')}</p>
            <h1>{t('activitiesPage.hero.title')}</h1>
            <p>{t('activitiesPage.hero.description')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="premium-button">
                <span>{t('activitiesPage.hero.primaryCta')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/realisations-projets" className="premium-button premium-button-secondary">
                <span>{t('activitiesPage.hero.secondaryCta')}</span>
                <MapPinned className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="activities-hero-proof" aria-label={t('activitiesPage.hero.proofLabel')}>
              {activityHeroProofKeys.map((proofKey) => (
                <span key={proofKey}>{t(proofKey)}</span>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="activities-hero-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="activities-hero-dossier-card">
              <span className="activities-card-icon">
                <ClipboardCheck className="size-5" aria-hidden="true" />
              </span>
              <p className="section-eyebrow">{t('activitiesPage.hero.dossierEyebrow')}</p>
              <h2>{t('activitiesPage.hero.dossierTitle')}</h2>
              <p>{t('activitiesPage.hero.dossierText')}</p>
            </div>

            <div className="activities-hero-dossier-media">
              {activityHeroMedia.map((media, index) => (
                <figure
                  key={media.id}
                  className={index === 0 ? 'activities-hero-photo-primary' : ''}
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
