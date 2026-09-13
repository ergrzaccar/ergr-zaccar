import { BellRing, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export interface AlertBannerProps {
  topic: 'tenders' | 'careers'
  targetId?: string
  className?: string
}

export function AlertBanner({ topic, targetId = 'alerts-subscription', className = '' }: AlertBannerProps) {
  const { t } = useTranslation()

  const isTenders = topic === 'tenders'

  const tagText = isTenders
    ? t('alertsSubscription.bannerTendersTag')
    : t('alertsSubscription.bannerCareersTag')

  const titleText = isTenders
    ? t('alertsSubscription.bannerTendersTitle')
    : t('alertsSubscription.bannerCareersTitle')

  const descText = isTenders
    ? t('alertsSubscription.bannerTendersDesc')
    : t('alertsSubscription.bannerCareersDesc')

  const btnText = isTenders
    ? t('alertsSubscription.bannerTendersBtn')
    : t('alertsSubscription.bannerCareersBtn')

  const handleScrollToSubscription = () => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // Visual highlight pulse on the card
      targetElement.classList.add('alert-card-highlighted')
      setTimeout(() => {
        targetElement.classList.remove('alert-card-highlighted')
      }, 2500)

      // Auto-focus email field after smooth scroll
      setTimeout(() => {
        const emailInput = document.getElementById('alert-email') as HTMLInputElement | null
        if (emailInput) {
          emailInput.focus({ preventScroll: true })
        }
      }, 600)
    }
  }

  return (
    <aside
      className={`alert-banner ${className}`.trim()}
      aria-labelledby={`alert-banner-title-${topic}`}
      data-testid="alert-banner"
    >
      <div className="alert-banner-left">
        <div className="alert-banner-icon-box" aria-hidden="true">
          <BellRing className="size-6 text-[var(--brand-primary)]" />
        </div>
        <div className="alert-banner-content">
          <div className="alert-banner-tag">
            <span className="alert-banner-tag-pulse" aria-hidden="true" />
            <span>{tagText}</span>
          </div>
          <h3 id={`alert-banner-title-${topic}`} className="alert-banner-title">
            {titleText}
          </h3>
          <p className="alert-banner-desc">{descText}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleScrollToSubscription}
        className="alert-banner-btn"
        aria-label={btnText}
      >
        <Send className="size-4 rtl:rotate-180" aria-hidden="true" />
        <span>{btnText}</span>
      </button>
    </aside>
  )
}
