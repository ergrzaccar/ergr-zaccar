import { Award, GraduationCap, MapPin, ShieldAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { hrValuesData } from '../../data/careersPage'
import { Reveal } from '../animation/Reveal'

const iconMap = {
  ShieldAlert,
  Award,
  GraduationCap,
  MapPin,
}

export function CareersValuesSection() {
  const { t } = useTranslation()

  return (
    <section className="careers-values-section">
      <div className="site-container">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <p className="section-eyebrow">{t('careersPage.values.eyebrow')}</p>
          <h2 className="section-heading mt-2">{t('careersPage.values.title')}</h2>
          <p className="section-description mt-3">{t('careersPage.values.description')}</p>
        </Reveal>

        <div className="careers-values-grid">
          {hrValuesData.map((val, idx) => {
            const IconComponent = iconMap[val.iconName]

            return (
              <Reveal key={val.id} delay={idx * 0.1} className="h-full">
                <div className="careers-value-card">
                  <div className="careers-value-icon-wrapper">
                    <IconComponent className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
                  </div>
                  <h3 className="careers-value-title">{t(val.titleKey)}</h3>
                  <p className="careers-value-desc">{t(val.descKey)}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
