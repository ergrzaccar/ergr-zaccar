import { useEffect, useState } from 'react'
import { BellRing, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AlertSubscriptionCard } from './AlertSubscriptionCard'

export interface AlertFloatingButtonProps {
  defaultTopic?: 'tenders' | 'careers' | 'both'
}

export function AlertFloatingButton({ defaultTopic = 'tenders' }: AlertFloatingButtonProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  // Determine button text based on page topic
  const buttonLabel =
    defaultTopic === 'tenders'
      ? t('alerts.floatingBtnTenders')
      : defaultTopic === 'careers'
        ? t('alerts.floatingBtnCareers')
        : t('alerts.floatingBtnDefault')

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="alert-fab-btn"
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        <span className="alert-fab-icon-wrapper">
          <BellRing className="size-5" aria-hidden="true" />
          <span className="alert-fab-pulse-dot" aria-hidden="true" />
        </span>
        <span className="alert-fab-label">{buttonLabel}</span>
      </button>

      {/* Subscription Modal Dialog */}
      {isOpen && (
        <div
          className="alert-modal-backdrop"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            className="alert-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-modal-heading"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="alert-modal-close-btn"
              aria-label={t('alerts.modalClose')}
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            {/* Inner subscription card */}
            <div className="alert-modal-content">
              <AlertSubscriptionCard defaultTopic={defaultTopic} compact={true} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
