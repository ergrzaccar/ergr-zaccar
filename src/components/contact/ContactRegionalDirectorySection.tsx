import { Building, Compass, Mail, MapPin, Phone, Printer, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { regionalContactCards } from '../../data/contactPage'

export function ContactRegionalDirectorySection() {
  const { t } = useTranslation()

  return (
    <section id="regional-directions" className="section-band contact-regional-section">
      <div className="site-container">
        <div className="contact-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('contactPage.regional.eyebrow')}</p>
            <h2 className="section-title">{t('contactPage.regional.title')}</h2>
            <p className="section-lead">{t('contactPage.regional.description')}</p>
          </Reveal>
        </div>

        <div className="contact-regional-grid">
          {regionalContactCards.map((dr, idx) => (
            <Reveal key={dr.id} delay={idx * 0.12} className="h-full">
              <article className="contact-dr-card">
                <div className="contact-dr-header">
                  <span className="contact-dr-badge">
                    <Compass className="size-3.5 inline-block mr-1" aria-hidden="true" />
                    <span>{dr.city}</span>
                  </span>
                  <h3 className="contact-dr-name">{t(dr.nameKey)}</h3>
                </div>

                <div className="contact-dr-body">
                  {/* Address */}
                  <div className="contact-dr-info-row">
                    <MapPin className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="contact-dr-address">{dr.address}</span>
                  </div>

                  {/* Phone & Fax */}
                  <div className="contact-dr-info-row">
                    <Phone className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <a href={`tel:${dr.phone.replace(/[\s()]/g, '')}`} className="hover:text-[var(--brand-primary)]">
                        {dr.phone}
                      </a>
                    </span>
                  </div>

                  <div className="contact-dr-info-row">
                    <Printer className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{dr.fax}</span>
                  </div>

                  {/* Email */}
                  <div className="contact-dr-info-row">
                    <Mail className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                    <a href={`mailto:${dr.email}`} className="text-[var(--brand-primary)] hover:underline truncate">
                      {dr.email}
                    </a>
                  </div>

                  {/* Territorial coverage */}
                  <div className="contact-dr-meta-box">
                    <div className="contact-dr-meta-item">
                      <span className="contact-dr-meta-label">{t('contactPage.regional.wilayasCovered')}</span>
                      <strong className="contact-dr-meta-val">{t(dr.wilayasKey)}</strong>
                    </div>

                    <div className="contact-dr-meta-item">
                      <span className="contact-dr-meta-label">
                        <Building className="size-3.5 inline-block mr-1 text-[var(--brand-primary)]" aria-hidden="true" />
                        {t('contactPage.regional.attachedUnits')}
                      </span>
                      <p className="contact-dr-meta-text">{t(dr.unitsKey)}</p>
                    </div>

                    <div className="contact-dr-meta-item">
                      <span className="contact-dr-meta-label">
                        <Wrench className="size-3.5 inline-block mr-1 text-[var(--brand-primary)]" aria-hidden="true" />
                        {t('contactPage.regional.attachedParks')}
                      </span>
                      <p className="contact-dr-meta-text">{t(dr.parksKey)}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
