import { ArrowRight, BookOpen, Building2, Clock, GraduationCap, School } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { internshipTracksData } from '../../data/careersPage'
import { Reveal } from '../animation/Reveal'

interface CareersInternshipsSectionProps {
  onApplyForInternship: () => void
}

export function CareersInternshipsSection({ onApplyForInternship }: CareersInternshipsSectionProps) {
  const { t } = useTranslation()

  return (
    <section id="careers-internships" className="careers-internships-section">
      <div className="site-container">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <p className="section-eyebrow">{t('careersPage.internships.eyebrow')}</p>
          <h2 className="section-heading mt-2">{t('careersPage.internships.title')}</h2>
          <p className="section-description mt-3">{t('careersPage.internships.description')}</p>
        </Reveal>

        {/* Academic Partners Banner */}
        <Reveal className="mb-10">
          <div className="careers-partners-banner">
            <div className="careers-partners-header">
              <School className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t('careersPage.internships.badgePartner')}</span>
            </div>
            <p className="careers-partners-list">
              {t('careersPage.internships.partnerList')}
            </p>
          </div>
        </Reveal>

        {/* 3 Tracks Cards */}
        <div className="careers-internships-grid">
          {internshipTracksData.map((track, idx) => (
            <Reveal key={track.id} delay={idx * 0.1} className="h-full">
              <div className="careers-internship-card">
                <div className="careers-internship-card-header">
                  <div className="careers-internship-icon-wrapper">
                    <GraduationCap className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                  </div>
                  <h3 className="careers-internship-title">{t(track.titleKey)}</h3>
                </div>

                <p className="careers-internship-desc">{t(track.descKey)}</p>

                <div className="careers-internship-meta-list">
                  <div className="careers-internship-meta-row">
                    <Clock className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                    <span>{t(track.durationKey)}</span>
                  </div>

                  <div className="careers-internship-meta-row">
                    <BookOpen className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                    <span>{t(track.targetKey)}</span>
                  </div>

                  <div className="careers-internship-meta-row">
                    <Building2 className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
                    <span>{t(track.partnerKey)}</span>
                  </div>
                </div>

                <div className="careers-internship-footer">
                  <button
                    type="button"
                    onClick={onApplyForInternship}
                    className="careers-internship-apply-btn"
                  >
                    <span>{t('careersPage.internships.applyPfe')}</span>
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
