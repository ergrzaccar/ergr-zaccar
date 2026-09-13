import { Calendar, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { historyEras } from '../../data/aboutPage'

export function AboutHistoryTimelineSection() {
  const { t } = useTranslation()

  return (
    <section id="history-timeline" className="section-band about-history-section">
      <div className="site-container">
        <div className="about-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('aboutPage.history.eyebrow')}</p>
            <h2 className="section-title">{t('aboutPage.history.title')}</h2>
            <p className="section-lead">{t('aboutPage.history.description')}</p>
          </Reveal>
        </div>

        {/* Timeline Eras Grid */}
        <div className="about-timeline-grid">
          {historyEras.map((era, index) => (
            <Reveal key={era.id} delay={index * 0.12} className="h-full">
              <article className="about-era-card">
                <div className="about-era-header">
                  <span className="about-era-badge">
                    <Calendar className="size-3.5 inline-block mr-1" aria-hidden="true" />
                    <span>{era.period}</span>
                  </span>
                  <span className="about-era-number">0{index + 1}</span>
                </div>

                <div className="about-era-body">
                  <span className="about-era-role">{t(era.roleKey)}</span>
                  <h3 className="about-era-title">{t(era.titleKey)}</h3>
                  <p className="about-era-desc">{t(era.descKey)}</p>

                  <div className="about-era-milestones">
                    <h4 className="about-milestones-title">{t('aboutPage.history.milestonesTitle')}</h4>
                    <ul className="about-milestones-list">
                      {era.milestones.map((mKey) => (
                        <li key={mKey} className="about-milestone-item">
                          <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{t(mKey)}</span>
                        </li>
                      ))}
                    </ul>
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
