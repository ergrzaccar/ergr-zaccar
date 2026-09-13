import { Building2, Quote } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { leadershipData } from '../../data/aboutPage'

export function AboutLeadershipSection() {
  const { t } = useTranslation()

  return (
    <section id="leadership-message" className="section-band about-leadership-section">
      <div className="site-container">
        <div className="about-leadership-grid">
          {/* Leadership Copy */}
          <Reveal className="about-leadership-copy">
            <p className="section-eyebrow">{t('aboutPage.leadership.eyebrow')}</p>
            <h2 className="section-title">{t('aboutPage.leadership.title')}</h2>

            <blockquote className="about-leadership-quote">
              <Quote className="about-quote-icon size-8" aria-hidden="true" />
              <p>{t(leadershipData.quoteKey)}</p>
            </blockquote>

            <div className="about-leadership-paragraphs">
              <p>{t(leadershipData.body1Key)}</p>
              <p>{t(leadershipData.body2Key)}</p>
            </div>

            <div className="about-leadership-signature">
              <div className="about-signature-info">
                <strong>{t(leadershipData.authorKey)}</strong>
                <span>{t(leadershipData.roleKey)}</span>
              </div>
              <div className="about-signature-badge">
                <Building2 className="size-4 text-[var(--brand-primary)] inline-block mr-1" aria-hidden="true" />
                <span>ERGR Zaccar / Groupe Génie Rural</span>
              </div>
            </div>
          </Reveal>

          {/* Leadership Portrait Card */}
          <Reveal delay={0.15} className="about-leadership-card-wrap">
            <div className="about-leadership-card">
              <figure className="about-leadership-figure">
                <img
                  src={leadershipData.imageSrc}
                  alt="Président Directeur Général - ERGR Zaccar"
                  loading="lazy"
                  decoding="async"
                  className="about-leadership-img"
                />
                <figcaption className="about-leadership-caption">
                  <strong>{t(leadershipData.authorKey)}</strong>
                  <span>{t(leadershipData.roleKey)}</span>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
