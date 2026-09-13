import { Building2, Clock, ExternalLink, Mail, MapPin, Phone, Printer } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { centralDepartments, hqContactInfo } from '../../data/contactPage'

export function ContactHeadquartersSection() {
  const { t } = useTranslation()

  return (
    <section id="headquarters" className="section-band contact-hq-section">
      <div className="site-container">
        <div className="contact-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('contactPage.hq.eyebrow')}</p>
            <h2 className="section-title">{t('contactPage.hq.title')}</h2>
            <p className="section-lead">{t('contactPage.hq.description')}</p>
          </Reveal>
        </div>

        <div className="contact-hq-grid">
          {/* Main Headquarters Card */}
          <Reveal className="h-full">
            <div className="contact-hq-main-card">
              <div className="contact-hq-card-header">
                <div className="contact-hq-icon-wrap">
                  <Building2 className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="contact-hq-card-title">{t(hqContactInfo.nameKey)}</h3>
                  <span className="contact-hq-badge">Direction Générale</span>
                </div>
              </div>

              <div className="contact-hq-details-list">
                {/* Physical Address */}
                <div className="contact-hq-detail-item">
                  <MapPin className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="contact-hq-detail-label">{t('contactPage.hq.addressLabel')}</span>
                    <p className="contact-hq-detail-value">{hqContactInfo.address}</p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="contact-hq-detail-item">
                  <Phone className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="contact-hq-detail-label">{t('contactPage.hq.phoneLabel')}</span>
                    <p className="contact-hq-detail-value">
                      <a href={`tel:${hqContactInfo.phonePrimary.replace(/[\s()]/g, '')}`} className="hover:text-[var(--brand-primary)]">
                        {hqContactInfo.phonePrimary}
                      </a>
                      {' / '}
                      <a href={`tel:${hqContactInfo.phoneSecondary.replace(/[\s()]/g, '')}`} className="hover:text-[var(--brand-primary)]">
                        {hqContactInfo.phoneSecondary}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Fax */}
                <div className="contact-hq-detail-item">
                  <Printer className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="contact-hq-detail-label">{t('contactPage.hq.faxLabel')}</span>
                    <p className="contact-hq-detail-value">{hqContactInfo.fax}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-hq-detail-item">
                  <Mail className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="contact-hq-detail-label">{t('contactPage.hq.emailLabel')}</span>
                    <p className="contact-hq-detail-value">
                      <a href={`mailto:${hqContactInfo.email}`} className="text-[var(--brand-primary)] hover:underline">
                        {hqContactInfo.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="contact-hq-detail-item">
                  <Clock className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="contact-hq-detail-label">{t('contactPage.hq.hoursLabel')}</span>
                    <p className="contact-hq-detail-value">
                      <strong>{t(hqContactInfo.workingDaysKey)} :</strong> {t(hqContactInfo.workingHoursKey)}
                    </p>
                    <span className="text-xs text-[var(--text-muted)] block mt-0.5">
                      {t('contactPage.hq.closedDays')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="contact-hq-footer">
                <a
                  href={hqContactInfo.mapQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button contact-hq-map-btn"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  <span>{t('contactPage.hq.viewMap')}</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Central Departments List */}
          <div className="contact-departments-list">
            <div className="contact-departments-intro">
              <span className="section-eyebrow">{t('contactPage.departments.eyebrow')}</span>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                {t('contactPage.departments.title')}
              </h3>
            </div>

            <div className="contact-departments-grid">
              {centralDepartments.map((dept, idx) => (
                <Reveal key={dept.id} delay={idx * 0.1}>
                  <div className="contact-dept-card">
                    <h4 className="contact-dept-title">{t(dept.titleKey)}</h4>
                    <p className="contact-dept-role">{t(dept.roleKey)}</p>

                    <div className="contact-dept-meta">
                      <a href={`mailto:${dept.email}`} className="contact-dept-email">
                        <Mail className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
                        <span>{dept.email}</span>
                      </a>
                      <span className="contact-dept-phone">
                        <Phone className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
                        <span>{dept.phone}</span>
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
