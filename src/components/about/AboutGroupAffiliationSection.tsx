import { Building2, Layers, ShieldCheck, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { groupAffiliationFeatures } from '../../data/aboutPage'
import { companyIdentity } from '../../data/company'

export function AboutGroupAffiliationSection() {
  const { t } = useTranslation()

  const featureIcons = [
    <Layers key="synergy" className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />,
    <ShieldCheck key="governance" className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />,
    <Building2 key="ministry" className="size-6 text-[var(--brand-primary)]" aria-hidden="true" />,
  ]

  return (
    <section id="group-affiliation" className="section-band about-group-section">
      <div className="site-container">
        <div className="about-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('aboutPage.group.eyebrow')}</p>
            <h2 className="section-title">{t('aboutPage.group.title')}</h2>
            <p className="section-lead">{t('aboutPage.group.description')}</p>
          </Reveal>
        </div>

        <div className="about-group-grid">
          {/* Institutional Card */}
          <Reveal className="h-full">
            <div className="about-group-badge-card">
              <div className="about-group-img-wrapper">
                <img
                  src="/images/Administration.jpg"
                  alt={companyIdentity.headquarters.address}
                  className="about-group-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="about-group-overlay">
                  <span className="about-group-tag">Groupe Génie Rural (GGR)</span>
                </div>
              </div>

              <div className="about-group-card-body">
                <h3 className="about-group-card-title">{companyIdentity.legalName}</h3>
                <p className="about-group-card-subtitle">{companyIdentity.legalStatus}</p>

                <ul className="about-group-specs">
                  <li>
                    <CheckCircle className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                    <span><strong>Tutelle :</strong> {companyIdentity.tutelle}</span>
                  </li>
                  <li>
                    <CheckCircle className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                    <span><strong>Maison mère :</strong> {companyIdentity.ownership}</span>
                  </li>
                  <li>
                    <CheckCircle className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                    <span><strong>Capital social :</strong> {companyIdentity.shareCapital}</span>
                  </li>
                  <li>
                    <CheckCircle className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                    <span><strong>Siège :</strong> {companyIdentity.headquarters.address}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Features Column */}
          <div className="about-group-features-list">
            {groupAffiliationFeatures.map((feature, idx) => (
              <Reveal key={feature.id} delay={idx * 0.12}>
                <article className="about-group-feature-item">
                  <div className="about-group-feature-icon">
                    {featureIcons[idx % featureIcons.length]}
                  </div>
                  <div>
                    <h3 className="about-group-feature-title">{t(feature.titleKey)}</h3>
                    <p className="about-group-feature-desc">{t(feature.descKey)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
