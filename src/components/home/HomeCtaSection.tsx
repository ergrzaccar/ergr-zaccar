import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Reveal } from '../animation/Reveal'

export function HomeCtaSection() {
  const { t } = useTranslation()

  return (
    <section className="section-band pt-0">
      <div className="site-container">
        <Reveal>
          <div className="home-cta">
            <div className="topographic-lines absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="relative z-10 max-w-3xl">
              <p className="section-eyebrow">{t('home.cta.eyebrow')}</p>
              <h2 className="mt-4 text-balance text-3xl font-black text-[var(--text-primary)] sm:text-5xl">
                {t('home.cta.title')}
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                {t('home.cta.description')}
              </p>
            </div>
            <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="premium-button">
                <Mail className="size-4" aria-hidden="true" />
                <span>{t('home.cta.contact')}</span>
              </Link>
              <Link to="/appels-offres" className="premium-button premium-button-secondary">
                <FileText className="size-4" aria-hidden="true" />
                <span>{t('home.cta.tenders')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
