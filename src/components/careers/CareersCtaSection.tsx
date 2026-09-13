import { Building2, Clock, Mail, Phone, ShieldCheck, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { hrContactInfo } from '../../data/careersPage'
import { Reveal } from '../animation/Reveal'

export function CareersCtaSection() {
  const { t } = useTranslation()

  return (
    <section className="careers-cta-section">
      <div className="site-container">
        <Reveal className="careers-cta-card">
          <div className="text-center max-w-2xl mx-auto">
            <span className="section-eyebrow flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
              {t('careersPage.cta.eyebrow')}
            </span>
            <h2 className="careers-cta-title">{t('careersPage.cta.title')}</h2>
            <p className="careers-cta-description">{t('careersPage.cta.description')}</p>

            <div className="careers-cta-actions">
              <a
                href={`mailto:${hrContactInfo.email}`}
                className="premium-button"
              >
                <Mail className="size-4" aria-hidden="true" />
                <span>{t('careersPage.cta.primaryButton')}</span>
              </a>

              <Link
                to="/realisations-projets"
                className="premium-button premium-button-secondary"
              >
                <span>{t('careersPage.cta.secondaryButton')}</span>
              </Link>
            </div>
          </div>

          {/* HR Office Info Cards */}
          <div className="careers-office-info-grid">
            <div className="careers-office-item">
              <Building2 className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong>{hrContactInfo.departmentName}</strong>
                <p>{hrContactInfo.headquarters}</p>
              </div>
            </div>

            <div className="careers-office-item">
              <Clock className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong>{t('careersPage.cta.officeHours')}</strong>
                <p>{hrContactInfo.hours}</p>
              </div>
            </div>

            <div className="careers-office-item">
              <Phone className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong>{t('careersPage.cta.officePhone')}</strong>
                <p>{hrContactInfo.phone}</p>
              </div>
            </div>

            <div className="careers-office-item">
              <Mail className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong>{t('careersPage.cta.officeEmail')}</strong>
                <p>{hrContactInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Equal Opportunity Charter Note */}
          <div className="careers-charter-box">
            <ShieldCheck className="size-5 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
            <p className="text-xs text-[var(--text-secondary)]">
              {t('careersPage.cta.charterNote')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
