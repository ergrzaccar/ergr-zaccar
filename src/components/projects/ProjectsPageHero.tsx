import { ArrowUpRight, CheckCircle2, Compass, Layers } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'
import { projectHeroProofKeys } from '../../data/projectsPage'

export function ProjectsPageHero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="projects-page-hero">
      <TopographicBackground className="opacity-70" />
      <div className="site-container relative">
        <div className="projects-hero-grid">
          <Reveal className="projects-hero-copy">
            <p className="section-eyebrow">{t('pages.projects.eyebrow')}</p>
            <h1>{t('projectsPage.hero.title')}</h1>
            <p className="projects-hero-lead">{t('projectsPage.hero.description')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#projects-catalog" className="premium-button">
                <span>{t('projectsPage.hero.primaryCta')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#projects-impact" className="premium-button premium-button-secondary">
                <span>{t('projectsPage.hero.secondaryCta')}</span>
                <Compass className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="projects-hero-proof">
              {projectHeroProofKeys.map((proofKey) => (
                <span key={proofKey} className="projects-proof-badge">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t(proofKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="projects-hero-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="projects-hero-dossier-card">
              <span className="projects-card-icon">
                <Layers className="size-5" aria-hidden="true" />
              </span>
              <p className="section-eyebrow">{t('projectsPage.hero.dossierEyebrow')}</p>
              <h2>{t('projectsPage.hero.dossierTitle')}</h2>
              <p>{t('projectsPage.hero.dossierText')}</p>
            </div>

            <div className="projects-hero-dossier-media">
              <figure className="projects-hero-photo-primary">
                <img
                  src="/images/477080385_936387561945431_8023476943758542750_n.jpg"
                  alt="Chantier de reboisement en montagne par l'ERGR Zaccar"
                  loading="eager"
                  decoding="async"
                />
                <figcaption>Reboisement et fixation des sols - Barrage Vert</figcaption>
              </figure>
              <figure>
                <img
                  src="/images/480746303_947928867457967_334810032618287641_n.jpg"
                  alt="Ouverture de pistes forestières"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Ouverture et reprofilage de pistes de désenclavement</figcaption>
              </figure>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
