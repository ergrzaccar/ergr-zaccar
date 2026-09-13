import { ArrowUpRight, FileText, Truck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { TopographicBackground } from '../animation/TopographicBackground'
import { Reveal } from '../animation/Reveal'

export function ProjectsCtaSection() {
  const { t } = useTranslation()

  return (
    <section className="section-band">
      <div className="site-container">
        <Reveal className="projects-final-cta">
          <TopographicBackground className="opacity-60" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-eyebrow">{t('projectsPage.cta.eyebrow')}</p>
              <h2>{t('projectsPage.cta.title')}</h2>
              <p>{t('projectsPage.cta.description')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to="/contact" className="premium-button">
                <FileText className="size-4" aria-hidden="true" />
                <span>{t('projectsPage.cta.primaryButton')}</span>
              </Link>
              <Link to="/moyens" className="premium-button premium-button-secondary">
                <Truck className="size-4" aria-hidden="true" />
                <span>{t('projectsPage.cta.secondaryButton')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
