import { ArrowUpRight, CheckCircle2, PhoneCall, Sprout } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'
import { nurseryHeroMedia, nurseryHeroProofKeys } from '../../data/nurseriesPage'

export function NurseriesPageHero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="nurseries-page-hero">
      <TopographicBackground className="opacity-70" />
      <div className="site-container relative">
        <div className="nurseries-hero-grid">
          <Reveal className="nurseries-hero-copy">
            <p className="section-eyebrow">{t('pages.nurseries.eyebrow')}</p>
            <h1>{t('nurseriesPage.hero.title')}</h1>
            <p className="nurseries-hero-lead">{t('nurseriesPage.hero.description')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#nurseries-directory" className="premium-button">
                <span>{t('nurseriesPage.hero.primaryCta')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <Link to="/contact" className="premium-button premium-button-secondary">
                <span>{t('nurseriesPage.hero.secondaryCta')}</span>
                <PhoneCall className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="nurseries-hero-proof">
              {nurseryHeroProofKeys.map((proofKey) => (
                <span key={proofKey} className="nurseries-proof-badge">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t(proofKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="nurseries-hero-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nurseries-hero-dossier-card">
              <span className="nurseries-card-icon">
                <Sprout className="size-5" aria-hidden="true" />
              </span>
              <p className="section-eyebrow">{t('nurseriesPage.hero.summaryEyebrow')}</p>
              <h2>{t('nurseriesPage.hero.summaryTitle')}</h2>
              <p>{t('nurseriesPage.hero.summaryText')}</p>
            </div>

            <div className="nurseries-hero-dossier-media">
              {nurseryHeroMedia.map((media, index) => (
                <figure
                  key={media.id}
                  className={index === 0 ? 'nurseries-hero-photo-primary' : ''}
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
