import { ArrowUpRight, Award, CheckCircle2, MessageSquareQuote } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'
import { aboutHeroProofKeys } from '../../data/aboutPage'

export function AboutPageHero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="about-page-hero">
      <TopographicBackground className="opacity-70" />
      <div className="site-container relative">
        <div className="about-hero-grid">
          <Reveal className="about-hero-copy">
            <p className="section-eyebrow">{t('pages.about.eyebrow')}</p>
            <h1>{t('aboutPage.hero.title')}</h1>
            <p className="about-hero-lead">{t('aboutPage.hero.description')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#history-timeline" className="premium-button">
                <span>{t('aboutPage.hero.primaryCta')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#leadership-message" className="premium-button premium-button-secondary">
                <span>{t('aboutPage.hero.secondaryCta')}</span>
                <MessageSquareQuote className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="about-hero-proof">
              {aboutHeroProofKeys.map((proofKey) => (
                <span key={proofKey} className="about-proof-badge">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t(proofKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="about-hero-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-hero-dossier-card">
              <span className="about-card-icon">
                <Award className="size-5" aria-hidden="true" />
              </span>
              <p className="section-eyebrow">{t('aboutPage.hero.dossierEyebrow')}</p>
              <h2>{t('aboutPage.hero.dossierTitle')}</h2>
              <p>{t('aboutPage.hero.dossierText')}</p>
            </div>

            <div className="about-hero-dossier-media">
              <figure className="about-hero-photo-primary">
                <img
                  src="/images/Administration.jpg"
                  alt="Siège social de l'ERGR Zaccar à Rouiba, Alger"
                  loading="eager"
                  decoding="async"
                />
                <figcaption>Direction Générale et Siège Social - Rouiba (Alger)</figcaption>
              </figure>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
