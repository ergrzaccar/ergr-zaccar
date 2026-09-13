import { Building2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Reveal } from '../animation/Reveal'

export function TendersCtaSection() {
  const { t } = useTranslation()

  return (
    <section className="tenders-cta-section">
      <div className="site-container">
        <Reveal className="tenders-cta-card">
          <div className="tenders-cta-content">
            <p className="tenders-cta-eyebrow">{t('tendersPage.cta.eyebrow')}</p>
            <h2 className="tenders-cta-title">{t('tendersPage.cta.title')}</h2>
            <p className="tenders-cta-desc">{t('tendersPage.cta.description')}</p>

            <div className="tenders-cta-actions">
              <Link to="/contact" className="premium-button">
                <span>{t('tendersPage.cta.primaryButton')}</span>
                <Send className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/organisation-implantation" className="premium-button premium-button-secondary">
                <span>{t('tendersPage.cta.secondaryButton')}</span>
                <Building2 className="size-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Procurement office details card */}
            <div className="tenders-office-info-grid">
              <div className="tenders-office-item">
                <MapPin className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Localisation
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    {t('tendersPage.cta.officeAddress')}
                  </p>
                </div>
              </div>

              <div className="tenders-office-item">
                <Phone className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Ligne directe
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    <a href="tel:+21323854120" className="hover:text-[var(--brand-primary)] transition-colors">
                      {t('tendersPage.cta.officePhone')}
                    </a>
                  </p>
                </div>
              </div>

              <div className="tenders-office-item">
                <Mail className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Courriel officiel
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    <a href="mailto:marches@ergr-zaccar.dz" className="hover:text-[var(--brand-primary)] transition-colors">
                      {t('tendersPage.cta.officeEmail')}
                    </a>
                  </p>
                </div>
              </div>

              <div className="tenders-office-item">
                <Clock className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Horaires de réception
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    {t('tendersPage.cta.officeHours')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
