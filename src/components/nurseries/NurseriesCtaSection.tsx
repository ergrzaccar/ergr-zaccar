import { ArrowUpRight, Mail, Trees } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'

export function NurseriesCtaSection() {
  const { t } = useTranslation()

  return (
    <section className="section-band">
      <div className="site-container">
        <Reveal className="nurseries-final-cta">
          <TopographicBackground className="opacity-60" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-eyebrow">{t('nurseriesPage.cta.eyebrow')}</p>
              <h2>{t('nurseriesPage.cta.title')}</h2>
              <p>{t('nurseriesPage.cta.description')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to="/contact" className="premium-button">
                <Mail className="size-4" aria-hidden="true" />
                <span>{t('nurseriesPage.cta.primaryButton')}</span>
              </Link>
              <Link to="/domaines-activite" className="premium-button premium-button-secondary">
                <Trees className="size-4" aria-hidden="true" />
                <span>{t('nurseriesPage.cta.secondaryButton')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
