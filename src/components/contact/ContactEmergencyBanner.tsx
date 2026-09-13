import { Flame, PhoneCall, ShieldAlert, Truck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { emergencyHotlines } from '../../data/contactPage'

export function ContactEmergencyBanner() {
  const { t } = useTranslation()

  const getIcon = (id: string) => {
    switch (id) {
      case 'dgf':
        return <Flame className="size-6 text-amber-500" aria-hidden="true" />
      case 'civil-defense':
        return <ShieldAlert className="size-6 text-red-500" aria-hidden="true" />
      case 'ergr-duty':
        return <Truck className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
      default:
        return <PhoneCall className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
    }
  }

  return (
    <section className="section-band contact-emergency-section">
      <div className="site-container">
        <div className="contact-emergency-card">
          <Reveal>
            <div className="contact-emergency-header">
              <span className="contact-emergency-badge">
                <ShieldAlert className="size-4 inline-block mr-1" aria-hidden="true" />
                <span>{t('contactPage.emergency.eyebrow')}</span>
              </span>
              <h2 className="contact-emergency-title">{t('contactPage.emergency.title')}</h2>
              <p className="contact-emergency-desc">{t('contactPage.emergency.description')}</p>
            </div>

            <div className="contact-emergency-grid">
              {emergencyHotlines.map((hotline) => (
                <div key={hotline.id} className="contact-emergency-item">
                  <div className="contact-emergency-icon-wrap">
                    {getIcon(hotline.id)}
                  </div>

                  <div>
                    <h3 className="contact-emergency-item-label">{t(hotline.labelKey)}</h3>
                    <div className="contact-emergency-number">{hotline.number}</div>
                    <p className="contact-emergency-item-desc">{t(hotline.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
