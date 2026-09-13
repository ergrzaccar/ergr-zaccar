import { ArrowUpRight, FileText, Mail, Sprout } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'

export function ActivitiesCtaSection() {
  const { t } = useTranslation()

  return (
    <section className="section-band">
      <div className="site-container">
        <Reveal className="activities-final-cta">
          <TopographicBackground className="opacity-60" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-eyebrow">{t('activitiesPage.cta.eyebrow')}</p>
              <h2>{t('activitiesPage.cta.title')}</h2>
              <p>{t('activitiesPage.cta.description')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to="/contact" className="premium-button">
                <Mail className="size-4" aria-hidden="true" />
                <span>{t('activitiesPage.cta.contact')}</span>
              </Link>
              <Link to="/realisations-projets" className="premium-button premium-button-secondary">
                <FileText className="size-4" aria-hidden="true" />
                <span>{t('activitiesPage.cta.projects')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/pepinieres" className="premium-button premium-button-secondary">
                <Sprout className="size-4" aria-hidden="true" />
                <span>{t('activitiesPage.cta.nurseries')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
