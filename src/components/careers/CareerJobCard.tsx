import { ArrowRight, Calendar, ChevronRight, Clock, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { CareerJobOffer } from '../../data/careersPage'

interface CareerJobCardProps {
  offer: CareerJobOffer
  onSelect: (offer: CareerJobOffer) => void
  onApply: (offer: CareerJobOffer) => void
}

export function CareerJobCard({ offer, onSelect, onApply }: CareerJobCardProps) {
  const { t } = useTranslation()

  return (
    <article className={`career-job-card ${offer.isFeatured ? 'is-featured' : ''}`}>
      {/* Header with Reference, Domain and Contract Type */}
      <div className="career-job-card-header">
        <div className="flex flex-wrap items-center gap-2">
          <span className="career-job-ref">{offer.ref}</span>
          <span className="career-job-domain-badge">
            {t(`careersPage.filters.domains.${offer.domain === 'forestry-agronomy' ? 'forestryAgronomy' : offer.domain === 'heavy-equipment' ? 'heavyEquipment' : offer.domain === 'engineering-sig' ? 'engineeringSig' : offer.domain}`)}
          </span>
          {offer.isFeatured && (
            <span className="career-job-featured-badge">
              <Sparkles className="size-3" aria-hidden="true" />
              <span>{t('careersPage.jobs.featuredBadge')}</span>
            </span>
          )}
        </div>

        <span className="career-job-contract-pill">
          {t(`careersPage.filters.contracts.${offer.contractType === 'cdd-project' ? 'cddProject' : offer.contractType === 'internship-pfe' ? 'internshipPfe' : offer.contractType}`)}
        </span>
      </div>

      {/* Title & Summary */}
      <div className="career-job-card-body">
        <h3 className="career-job-card-title">{t(offer.titleKey)}</h3>
        <p className="career-job-card-summary">{t(offer.summaryKey)}</p>

        {/* Key Requirements Meta */}
        <div className="career-job-meta-grid">
          <div className="career-job-meta-item">
            <MapPin className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
            <span>{t(offer.locationKey)}</span>
          </div>

          <div className="career-job-meta-item">
            <GraduationCap className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
            <span>{t(offer.educationKey)}</span>
          </div>

          <div className="career-job-meta-item">
            <Clock className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
            <span>{t(offer.experienceKey)}</span>
          </div>

          <div className="career-job-meta-item">
            <Calendar className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
            <span>{t('careersPage.jobs.deadlineLabel')} <strong>{offer.deadline}</strong></span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="career-job-card-footer">
        <button
          type="button"
          onClick={() => onSelect(offer)}
          className="career-job-details-btn"
        >
          <span>{t('careersPage.jobs.viewOffer')}</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onApply(offer)}
          className="career-job-apply-btn"
        >
          <span>{t('careersPage.jobs.applyDirect')}</span>
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
