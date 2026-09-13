import { ArrowUpRight, CheckCircle2, FolderArchive, Newspaper } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'
import { newsHeroProofKeys } from '../../data/newsPage'

export function NewsPageHero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="news-page-hero">
      <TopographicBackground className="opacity-70" />
      <div className="site-container relative">
        <div className="news-hero-grid">
          <Reveal className="news-hero-copy">
            <p className="section-eyebrow">{t('pages.news.eyebrow')}</p>
            <h1>{t('newsPage.hero.title')}</h1>
            <p className="news-hero-lead">{t('newsPage.hero.description')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#news-feed" className="premium-button">
                <span>{t('newsPage.hero.primaryCta')}</span>
                <Newspaper className="size-4" aria-hidden="true" />
              </a>
              <a href="#news-press" className="premium-button premium-button-secondary">
                <span>{t('newsPage.hero.secondaryCta')}</span>
                <FolderArchive className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="news-hero-proof">
              {newsHeroProofKeys.map((proofKey) => (
                <span key={proofKey} className="news-proof-badge">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t(proofKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="news-hero-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="news-hero-dossier-card">
              <span className="news-card-icon">
                <Newspaper className="size-5" aria-hidden="true" />
              </span>
              <p className="section-eyebrow">{t('newsPage.hero.dossierEyebrow')}</p>
              <h2>{t('newsPage.hero.dossierTitle')}</h2>
              <p>{t('newsPage.hero.dossierText')}</p>
            </div>

            <div className="news-hero-dossier-media">
              <figure className="news-media-figure">
                <img
                  src="/images/IMG_20151105_142546.jpg"
                  alt="ERGR Zaccar - Relance stratégique du Barrage Vert"
                  loading="eager"
                  className="news-media-image"
                />
                <figcaption className="news-media-caption">
                  <span>{t('newsPage.hero.dossierTitle')}</span>
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
