import { useEffect } from 'react'
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck2,
  GraduationCap,
  MapPin,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { CareerJobOffer } from '../../data/careersPage'

interface CareerJobModalProps {
  offer: CareerJobOffer | null
  isOpen: boolean
  onClose: () => void
  onApply: (offer: CareerJobOffer) => void
}

export function CareerJobModal({ offer, isOpen, onClose, onApply }: CareerJobModalProps) {
  const { t } = useTranslation()

  // Handle Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !offer) return null

  const handleApplyClick = () => {
    onClose()
    onApply(offer)
  }

  return (
    <div
      className="career-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-modal-title"
      onClick={onClose}
    >
      <div
        className="career-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="career-modal-header">
          <div className="career-modal-header-badges">
            <span className="career-modal-badge">
              <Briefcase className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t('careersPage.modal.badge')}</span>
            </span>
            <span className="career-job-ref">{offer.ref}</span>
            <span className="career-job-contract-pill">
              {t(`careersPage.filters.contracts.${offer.contractType === 'cdd-project' ? 'cddProject' : offer.contractType === 'internship-pfe' ? 'internshipPfe' : offer.contractType}`)}
            </span>
            {offer.isFeatured && (
              <span className="career-job-featured-badge">
                <Sparkles className="size-3" aria-hidden="true" />
                <span>{t('careersPage.jobs.featuredBadge')}</span>
              </span>
            )}
          </div>

          <h2 id="career-modal-title" className="career-modal-title">
            {t(offer.titleKey)}
          </h2>

          <div className="career-modal-meta-bar">
            <div className="career-modal-meta-item">
              <MapPin className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t(offer.locationKey)}</span>
            </div>
            <div className="career-modal-meta-item">
              <GraduationCap className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t(offer.educationKey)}</span>
            </div>
            <div className="career-modal-meta-item">
              <Clock className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t(offer.experienceKey)}</span>
            </div>
            <div className="career-modal-meta-item">
              <Calendar className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t('careersPage.jobs.deadlineLabel')} <strong>{offer.deadline}</strong></span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="career-modal-close-btn"
            aria-label={t('careersPage.modal.closeButton')}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="career-modal-body">
          {/* Summary Banner */}
          <div className="career-modal-summary-box">
            <p>{t(offer.summaryKey)}</p>
          </div>

          {/* Missions List */}
          <div className="career-modal-section">
            <h3 className="career-modal-section-title">
              <FileCheck2 className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t('careersPage.modal.missionsTitle')}</span>
            </h3>
            <ul className="career-modal-list">
              {offer.missionsKeys.map((key) => (
                <li key={key} className="career-modal-list-item">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements List */}
          <div className="career-modal-section">
            <h3 className="career-modal-section-title">
              <Award className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t('careersPage.modal.requirementsTitle')}</span>
            </h3>
            <ul className="career-modal-list">
              {offer.requirementsKeys.map((key) => (
                <li key={key} className="career-modal-list-item">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits List */}
          <div className="career-modal-section">
            <h3 className="career-modal-section-title">
              <Sparkles className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t('careersPage.modal.benefitsTitle')}</span>
            </h3>
            <ul className="career-modal-list">
              {offer.benefitsKeys.map((key) => (
                <li key={key} className="career-modal-list-item">
                  <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Kit Info Box */}
          <div className="career-modal-kit-box">
            <h4>{t('careersPage.modal.applicationKitTitle')}</h4>
            <p>{t('careersPage.modal.applicationKitText')}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="career-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="premium-button premium-button-secondary"
          >
            <span>{t('careersPage.modal.closeButton')}</span>
          </button>

          <button
            type="button"
            onClick={handleApplyClick}
            className="premium-button"
          >
            <span>{t('careersPage.modal.applyButton')}</span>
            <Send className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
