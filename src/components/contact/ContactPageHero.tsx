import { CheckCircle2, Headphones, MapPin, Send } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { TopographicBackground } from '../animation/TopographicBackground'
import { contactHeroProofKeys } from '../../data/contactPage'

export function ContactPageHero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="contact-page-hero">
      <TopographicBackground className="opacity-70" />
      <div className="site-container relative">
        <div className="contact-hero-grid">
          <Reveal className="contact-hero-copy">
            <p className="section-eyebrow">{t('pages.contact.eyebrow')}</p>
            <h1>{t('contactPage.hero.title')}</h1>
            <p className="contact-hero-lead">{t('contactPage.hero.description')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact-form" className="premium-button">
                <span>{t('contactPage.hero.primaryCta')}</span>
                <Send className="size-4" aria-hidden="true" />
              </a>
              <a href="#headquarters" className="premium-button premium-button-secondary">
                <span>{t('contactPage.hero.secondaryCta')}</span>
                <MapPin className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="contact-hero-proof">
              {contactHeroProofKeys.map((proofKey) => (
                <span key={proofKey} className="contact-proof-badge">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                  <span>{t(proofKey)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="contact-hero-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contact-hero-dossier-card">
              <span className="contact-card-icon">
                <Headphones className="size-5" aria-hidden="true" />
              </span>
              <p className="section-eyebrow">{t('contactPage.hero.dossierEyebrow')}</p>
              <h2>{t('contactPage.hero.dossierTitle')}</h2>
              <p>{t('contactPage.hero.dossierText')}</p>
            </div>

            <div className="contact-hero-dossier-media">
              <figure className="contact-hero-photo-primary">
                <img
                  src="/images/Administration.jpg"
                  alt="Siège social de l'ERGR Zaccar à Rouiba, Alger"
                  loading="eager"
                  decoding="async"
                />
                <figcaption>Siège Social & Direction Générale - Rouiba (Alger)</figcaption>
              </figure>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
