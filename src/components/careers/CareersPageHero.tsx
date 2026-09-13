import { Briefcase, CheckCircle2, FileText, Send, Sparkles, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { careersHeroProofKeys, careersHeroStats } from '../../data/careersPage'
import { Reveal } from '../animation/Reveal'
import { TopographicBackground } from '../animation/TopographicBackground'

export function CareersPageHero() {
  const { t } = useTranslation()

  return (
    <section className="careers-page-hero">
      <TopographicBackground className="opacity-70" />

      <div className="site-container relative">
        <div className="careers-hero-grid">
          <Reveal className="careers-hero-copy">
            <p className="section-eyebrow">{t('careersPage.hero.eyebrow')}</p>
            <h1>{t('careersPage.hero.title')}</h1>
            <p className="careers-hero-lead">{t('careersPage.hero.lead')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#careers-jobs" className="premium-button">
                <span>{t('careersPage.hero.primaryCta')}</span>
                <Briefcase className="size-4" aria-hidden="true" />
              </a>
              <a href="#careers-apply" className="premium-button premium-button-secondary">
                <span>{t('careersPage.hero.secondaryCta')}</span>
                <Send className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="careers-hero-proof">
              {careersHeroProofKeys.map((proofKey) => (
                <span key={proofKey} className="careers-proof-badge">
                  <CheckCircle2
                    className="size-4 text-[var(--brand-primary)] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t(proofKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="careers-hero-media" delay={0.14}>
            <div className="careers-hero-dossier-card">
              <div className="careers-hero-dossier-header">
                <span className="section-eyebrow flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
                  {t('careersPage.hero.spotlightEyebrow')}
                </span>
                <h2>{t('careersPage.hero.spotlightTitle')}</h2>
                <p>{t('careersPage.hero.spotlightDesc')}</p>
              </div>

              <div className="careers-hero-photo-wrapper">
                <figure className="careers-hero-photo">
                  <img
                    src="/images/FB_20151101_12_23_30_Saved_Picture.jpg"
                    alt={t('careersPage.hero.spotlightTitle')}
                    className="careers-hero-image"
                    loading="eager"
                  />
                  <figcaption className="careers-hero-photo-caption">
                    <Users className="size-3.5 inline mr-1 text-[var(--brand-primary)]" />
                    <span>ERGR Zaccar • Équipes & encadrement technique</span>
                  </figcaption>
                </figure>
              </div>

              <div className="careers-hero-stats-grid">
                {careersHeroStats.map((stat) => (
                  <div key={stat.labelKey} className="careers-hero-stat-card">
                    <strong className="careers-hero-stat-value">{stat.value}</strong>
                    <span className="careers-hero-stat-label">{t(stat.labelKey)}</span>
                    <small className="careers-hero-stat-helper">{t(stat.helperKey)}</small>
                  </div>
                ))}
              </div>

              <div className="careers-hero-dossier-footer">
                <a href="#careers-internships" className="careers-pfe-link">
                  <FileText className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                  <span>{t('careersPage.internships.title')}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
