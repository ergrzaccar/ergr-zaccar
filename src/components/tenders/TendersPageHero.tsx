import { ArrowUpRight, BookOpen, CheckCircle2, FileText, Scale } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'
import { tendersHeroProofKeys } from '../../data/tendersPage'

export function TendersPageHero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="tenders-page-hero">
      <TopographicBackground className="opacity-70" />
      <div className="site-container relative">
        <div className="tenders-hero-grid">
          <Reveal className="tenders-hero-copy">
            <p className="section-eyebrow">{t('pages.tenders.eyebrow')}</p>
            <h1>{t('tendersPage.hero.title')}</h1>
            <p className="tenders-hero-lead">{t('tendersPage.hero.description')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#tenders-registry" className="premium-button">
                <span>{t('tendersPage.hero.primaryCta')}</span>
                <FileText className="size-4" aria-hidden="true" />
              </a>
              <a href="#tenders-guide" className="premium-button premium-button-secondary">
                <span>{t('tendersPage.hero.secondaryCta')}</span>
                <BookOpen className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="tenders-hero-proof">
              {tendersHeroProofKeys.map((proofKey) => (
                <span key={proofKey} className="tenders-proof-badge">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t(proofKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="tenders-hero-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="tenders-hero-dossier-card">
              <span className="tenders-card-icon">
                <Scale className="size-5" aria-hidden="true" />
              </span>
              <p className="section-eyebrow">{t('tendersPage.hero.dossierEyebrow')}</p>
              <h2>{t('tendersPage.hero.dossierTitle')}</h2>
              <p>{t('tendersPage.hero.dossierText')}</p>
            </div>

            <div className="tenders-hero-dossier-media">
              <figure className="tenders-media-figure">
                <img
                  src="/images/Administration.jpg"
                  alt="ERGR Zaccar Bureau des Marchés & Administration"
                  loading="eager"
                  className="tenders-media-image"
                />
                <figcaption className="tenders-media-caption">
                  <span>{t('tendersPage.hero.proof.office')}</span>
                  <ArrowUpRight className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
