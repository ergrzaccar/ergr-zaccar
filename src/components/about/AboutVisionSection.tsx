import { Compass, Sprout, Wrench, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { visionPillars } from '../../data/aboutPage'

export function AboutVisionSection() {
  const { t } = useTranslation()

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
      case 'Sprout':
        return <Sprout className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
      case 'Compass':
        return <Compass className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
      default:
        return <Compass className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />
    }
  }

  return (
    <section id="vision-2030" className="section-band about-vision-section">
      <div className="site-container">
        <div className="about-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('aboutPage.vision.eyebrow')}</p>
            <h2 className="section-title">{t('aboutPage.vision.title')}</h2>
            <p className="section-lead">{t('aboutPage.vision.description')}</p>
          </Reveal>
        </div>

        <div className="about-vision-grid">
          {visionPillars.map((pillar, idx) => (
            <Reveal key={pillar.id} delay={idx * 0.12} className="h-full">
              <article className="about-vision-card">
                <div className="about-vision-icon-wrapper">
                  {getIcon(pillar.iconName)}
                </div>

                <div className="about-vision-body">
                  <h3 className="about-vision-title">{t(pillar.titleKey)}</h3>
                  <p className="about-vision-desc">{t(pillar.descKey)}</p>

                  <div className="about-vision-action-badge">
                    <span>{t(pillar.actionKey)}</span>
                    <ArrowUpRight className="size-3.5 rtl:rotate-[-90deg]" aria-hidden="true" />
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
