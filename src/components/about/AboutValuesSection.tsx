import { Award, Landmark, MapPin, Trees } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { companyValues } from '../../data/aboutPage'

export function AboutValuesSection() {
  const { t } = useTranslation()

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
      case 'Landmark':
        return <Landmark className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
      case 'Trees':
        return <Trees className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
      case 'MapPin':
        return <MapPin className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
      default:
        return <Award className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
    }
  }

  return (
    <section id="values" className="section-band about-values-section">
      <div className="site-container">
        <div className="about-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('aboutPage.values.eyebrow')}</p>
            <h2 className="section-title">{t('aboutPage.values.title')}</h2>
            <p className="section-lead">{t('aboutPage.values.description')}</p>
          </Reveal>
        </div>

        <div className="about-values-grid">
          {companyValues.map((val, idx) => (
            <Reveal key={val.id} delay={idx * 0.1} className="h-full">
              <article className="about-value-card">
                <div className="about-value-top">
                  <div className="about-value-icon">
                    {getIcon(val.iconName)}
                  </div>
                  <span className="about-value-index">0{idx + 1}</span>
                </div>
                <h3 className="about-value-title">{t(val.titleKey)}</h3>
                <p className="about-value-desc">{t(val.descKey)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
