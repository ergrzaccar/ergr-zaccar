import { Briefcase, Clock, FileCheck2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Reveal } from '../animation/Reveal'

export function NewsCtaSection() {
  const { t } = useTranslation()

  return (
    <section className="news-cta-section">
      <div className="site-container">
        <Reveal className="news-cta-card">
          <div className="news-cta-content">
            <p className="news-cta-eyebrow">{t('newsPage.cta.eyebrow')}</p>
            <h2 className="news-cta-title">{t('newsPage.cta.title')}</h2>
            <p className="news-cta-desc">{t('newsPage.cta.description')}</p>

            <div className="news-cta-actions">
              <Link to="/contact" className="premium-button">
                <span>{t('newsPage.cta.primaryButton')}</span>
                <Send className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/realisations-projets" className="premium-button premium-button-secondary">
                <span>{t('newsPage.cta.secondaryButton')}</span>
                <Briefcase className="size-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Press office details grid */}
            <div className="news-office-info-grid">
              <div className="news-office-item">
                <MapPin className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Localisation
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    {t('newsPage.cta.officeAddress')}
                  </p>
                </div>
              </div>

              <div className="news-office-item">
                <Phone className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Ligne directe presse
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    <a href="tel:+21323854120" className="hover:text-[var(--brand-primary)] transition-colors">
                      {t('newsPage.cta.officePhone')}
                    </a>
                  </p>
                </div>
              </div>

              <div className="news-office-item">
                <Mail className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Courriel officiel
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    <a href="mailto:presse@ergr-zaccar.dz" className="hover:text-[var(--brand-primary)] transition-colors">
                      {t('newsPage.cta.officeEmail')}
                    </a>
                  </p>
                </div>
              </div>

              <div className="news-office-item">
                <Clock className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Accueil des journalistes
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    {t('newsPage.cta.officeHours')}
                  </p>
                </div>
              </div>
            </div>

            {/* Accreditation note */}
            <div className="news-accreditation-box">
              <FileCheck2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
              <p className="text-xs text-[var(--text-secondary)]">
                {t('newsPage.cta.accreditationNote')}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
