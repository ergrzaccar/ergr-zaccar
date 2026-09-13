import { useState } from 'react'
import { Bell, BellRing, Briefcase, CheckCircle2, FileText, Loader2, Mail, ShieldCheck, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useToast } from '../../context/ToastContext'

export interface AlertSubscriptionCardProps {
  defaultTopic?: 'tenders' | 'careers' | 'both'
  compact?: boolean
  className?: string
}

export function AlertSubscriptionCard({
  defaultTopic = 'tenders',
  compact = false,
  className = '',
}: AlertSubscriptionCardProps) {
  const { t, i18n } = useTranslation()
  const toast = useToast()

  const [tenders, setTenders] = useState(defaultTopic === 'tenders' || defaultTopic === 'both')
  const [careers, setCareers] = useState(defaultTopic === 'careers' || defaultTopic === 'both')
  const [organizationName, setOrganizationName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; topics?: string }>({})

  const validate = (): boolean => {
    const newErrors: { email?: string; topics?: string } = {}

    if (!tenders && !careers) {
      newErrors.topics = t('alerts.errorAtLeastOne')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      newErrors.email = t('alerts.errorInvalidEmail')
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = t('alerts.errorInvalidEmail')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    const currentLang = i18n.language?.startsWith('ar') ? 'ar' : 'fr'

    try {
      const response = await fetch('/api/alerts/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          organizationName: organizationName.trim(),
          tenders,
          careers,
          language: currentLang,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erreur d’enregistrement')
      }

      setIsSuccess(true)
      toast.success(
        data.alreadySubscribed
          ? t('alerts.alreadySubscribedMessage')
          : t('alerts.successMessage'),
        t('alerts.successTitle')
      )
    } catch (err: unknown) {
      console.error('Alert subscription error:', err)
      toast.error(
        err instanceof Error && err.message ? err.message : t('alerts.errorGeneral'),
        t('error.title')
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setEmail('')
    setOrganizationName('')
    setErrors({})
  }

  return (
    <div
      className={`alert-subscription-card ${compact ? 'alert-subscription-card--compact' : ''} ${className}`}
      id="alerts-subscription"
      role="region"
      aria-labelledby="alert-card-title"
    >
      {/* Decorative background glow */}
      <div className="alert-card-glow" aria-hidden="true" />

      {/* Header section */}
      <div className="alert-card-header">
        <div className="alert-card-badge">
          <BellRing className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
          <span>{t('alerts.badge')}</span>
        </div>
        <h2 id="alert-card-title" className="alert-card-title">
          {t('alerts.title')}
        </h2>
        <p className="alert-card-subtitle">{t('alerts.subtitle')}</p>
      </div>

      {isSuccess ? (
        <div className="alert-card-success" role="status" aria-live="polite">
          <div className="alert-success-icon-wrap">
            <CheckCircle2 className="size-10 text-[var(--brand-primary)]" aria-hidden="true" />
          </div>
          <h3 className="alert-success-title">{t('alerts.successTitle')}</h3>
          <p className="alert-success-desc">{t('alerts.successMessage')}</p>
          <div className="alert-success-details">
            <div className="alert-success-pill">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <span>{email}</span>
            </div>
            <div className="alert-success-badges">
              {tenders && <span className="alert-badge-item">{t('alerts.topicTenders')}</span>}
              {careers && <span className="alert-badge-item">{t('alerts.topicCareers')}</span>}
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="alert-btn-reset"
          >
            {i18n.language?.startsWith('ar') ? 'تعديل الخيارات أو تسجيل بريد آخر' : 'Modifier les options ou inscrire un autre e-mail'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="alert-card-form" noValidate>
          {/* Topics selection */}
          <div className="alert-form-group">
            <label className="alert-field-label">
              <span>{t('alerts.topicsLabel')}</span>
              {errors.topics && (
                <span className="alert-field-error" role="alert">
                  {errors.topics}
                </span>
              )}
            </label>

            <div className="alert-topics-grid" role="group" aria-label={t('alerts.topicsLabel')}>
              <label
                className={`alert-topic-card ${tenders ? 'alert-topic-card--active' : ''}`}
                htmlFor="alert-topic-tenders"
              >
                <input
                  id="alert-topic-tenders"
                  type="checkbox"
                  checked={tenders}
                  onChange={(e) => {
                    setTenders(e.target.checked)
                    if (errors.topics) setErrors((prev) => ({ ...prev, topics: undefined }))
                  }}
                  className="alert-checkbox"
                />
                <div className="alert-topic-icon">
                  <FileText className="size-5" aria-hidden="true" />
                </div>
                <div className="alert-topic-info">
                  <div className="alert-topic-title">{t('alerts.topicTenders')}</div>
                  <div className="alert-topic-desc">{t('alerts.topicTendersDesc')}</div>
                </div>
              </label>

              <label
                className={`alert-topic-card ${careers ? 'alert-topic-card--active' : ''}`}
                htmlFor="alert-topic-careers"
              >
                <input
                  id="alert-topic-careers"
                  type="checkbox"
                  checked={careers}
                  onChange={(e) => {
                    setCareers(e.target.checked)
                    if (errors.topics) setErrors((prev) => ({ ...prev, topics: undefined }))
                  }}
                  className="alert-checkbox"
                />
                <div className="alert-topic-icon">
                  <Briefcase className="size-5" aria-hidden="true" />
                </div>
                <div className="alert-topic-info">
                  <div className="alert-topic-title">{t('alerts.topicCareers')}</div>
                  <div className="alert-topic-desc">{t('alerts.topicCareersDesc')}</div>
                </div>
              </label>
            </div>
          </div>

          {/* Inputs Row */}
          <div className="alert-inputs-row">
            {/* Organization / Candidate Name */}
            <div className="alert-input-col">
              <label htmlFor="alert-org-name" className="alert-field-label">
                {t('alerts.orgNameLabel')}
              </label>
              <div className="alert-input-wrapper">
                <User className="alert-input-icon size-4 text-[var(--text-tertiary)]" aria-hidden="true" />
                <input
                  id="alert-org-name"
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder={t('alerts.orgNamePlaceholder')}
                  className="alert-text-input"
                  autoComplete="organization"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="alert-input-col">
              <label htmlFor="alert-email" className="alert-field-label">
                {t('alerts.emailLabel')}
              </label>
              <div className={`alert-input-wrapper ${errors.email ? 'alert-input-wrapper--error' : ''}`}>
                <Mail className="alert-input-icon size-4 text-[var(--text-tertiary)]" aria-hidden="true" />
                <input
                  id="alert-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  placeholder={t('alerts.emailPlaceholder')}
                  className="alert-text-input"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="alert-field-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="alert-action-wrap">
            <button
              type="submit"
              disabled={isSubmitting}
              className="alert-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  <span>{t('alerts.submitting')}</span>
                </>
              ) : (
                <>
                  <Bell className="size-4" aria-hidden="true" />
                  <span>{t('alerts.submitButton')}</span>
                </>
              )}
            </button>
            <p className="alert-service-badge">{t('alerts.activeNotice')}</p>
          </div>
        </form>
      )}

      {/* Law 18-07 Privacy Notice */}
      <div className="alert-card-footer">
        <ShieldCheck className="size-4 text-[var(--brand-primary)] shrink-0" aria-hidden="true" />
        <p className="alert-law-text">{t('alerts.lawNotice')}</p>
      </div>
    </div>
  )
}
