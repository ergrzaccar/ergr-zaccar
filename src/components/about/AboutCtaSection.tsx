import { ArrowRight, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Reveal } from '../animation/Reveal'

export function AboutCtaSection() {
  const { t } = useTranslation()

  return (
    <section className="section-band about-cta-section">
      <div className="site-container">
        <div className="about-cta-card">
          <Reveal>
            <p className="about-cta-eyebrow">{t('aboutPage.cta.eyebrow')}</p>
            <h2 className="about-cta-title">{t('aboutPage.cta.title')}</h2>
            <p className="about-cta-desc">{t('aboutPage.cta.description')}</p>

            <div className="about-cta-actions">
              <Link to="/organisation-implantation" className="btn-primary">
                <MapPin className="size-4" aria-hidden="true" />
                <span>{t('aboutPage.cta.primaryButton')}</span>
              </Link>
              <Link to="/projets" className="btn-secondary">
                <span>{t('aboutPage.cta.secondaryButton')}</span>
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
