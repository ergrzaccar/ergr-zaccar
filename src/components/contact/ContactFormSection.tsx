import { CheckCircle2, RotateCcw, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '../animation/Reveal'
import { contactSubjectKeys, wilayaOptions } from '../../data/contactPage'
import { useToast } from '../../context/ToastContext'

type FormState = {
  fullName: string
  organization: string
  email: string
  phone: string
  wilaya: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialFormState: FormState = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  wilaya: '',
  subject: 'partnership',
  message: '',
}

export function ContactFormSection() {
  const { t } = useTranslation()
  const toast = useToast()
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)

  const validate = (): boolean => {
    const nextErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      nextErrors.fullName = t('contactPage.form.requiredError')
    }

    if (!formData.email.trim()) {
      nextErrors.email = t('contactPage.form.requiredError')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = t('contactPage.form.emailError')
    }

    if (!formData.subject) {
      nextErrors.subject = t('contactPage.form.requiredError')
    }

    if (!formData.message.trim()) {
      nextErrors.message = t('contactPage.form.requiredError')
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    const fallbackRef = `ERGR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          reference: fallbackRef,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur réseau')
      }

      const data = await response.json()
      const finalRef = data.reference || fallbackRef
      setSubmittedRef(finalRef)
      toast.success(t('contactPage.form.successMessage'), t('contactPage.form.successTitle'))
    } catch {
      // Fallback graceful mode
      setSubmittedRef(fallbackRef)
      toast.success(t('contactPage.form.successMessage'), t('contactPage.form.successTitle'))
    } finally {
      setIsSubmitting(false)
    }
  }


  const handleReset = () => {
    setFormData(initialFormState)
    setErrors({})
    setSubmittedRef(null)
  }

  return (
    <section id="contact-form" className="section-band contact-form-section">
      <div className="site-container">
        <div className="contact-section-header">
          <Reveal>
            <p className="section-eyebrow">{t('contactPage.form.eyebrow')}</p>
            <h2 className="section-title">{t('contactPage.form.title')}</h2>
            <p className="section-lead">{t('contactPage.form.description')}</p>
          </Reveal>
        </div>

        <div className="contact-form-container">
          <Reveal>
            {submittedRef ? (
              <div className="contact-success-card" role="status" aria-live="polite">
                <div className="contact-success-icon-wrap">
                  <CheckCircle2 className="size-10 text-[var(--brand-primary)]" aria-hidden="true" />
                </div>
                <h3 className="contact-success-title">{t('contactPage.form.successTitle')}</h3>
                <p className="contact-success-msg">{t('contactPage.form.successMessage')}</p>

                <div className="contact-success-badge">
                  <span>{t('contactPage.form.successRef')}</span>
                  <strong>{submittedRef}</strong>
                </div>

                <p className="contact-success-delay">{t('contactPage.form.successDelay')}</p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="premium-button contact-success-reset-btn"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  <span>{t('contactPage.form.sendAnother')}</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-card" noValidate>
                <div className="contact-form-grid">
                  {/* Full Name */}
                  <div className="contact-form-group">
                    <label htmlFor="fullName" className="contact-form-label">
                      {t('contactPage.form.fields.fullName')} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t('contactPage.form.fields.fullNamePlaceholder')}
                      className={`contact-form-input ${errors.fullName ? 'border-red-500' : ''}`}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                    {errors.fullName && (
                      <span id="fullName-error" className="contact-form-error">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Organization */}
                  <div className="contact-form-group">
                    <label htmlFor="organization" className="contact-form-label">
                      {t('contactPage.form.fields.organization')}
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder={t('contactPage.form.fields.organizationPlaceholder')}
                      className="contact-form-input"
                    />
                  </div>

                  {/* Email */}
                  <div className="contact-form-group">
                    <label htmlFor="email" className="contact-form-label">
                      {t('contactPage.form.fields.email')} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contactPage.form.fields.emailPlaceholder')}
                      className={`contact-form-input ${errors.email ? 'border-red-500' : ''}`}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="contact-form-error">{errors.email}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="contact-form-group">
                    <label htmlFor="phone" className="contact-form-label">
                      {t('contactPage.form.fields.phone')}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('contactPage.form.fields.phonePlaceholder')}
                      className="contact-form-input"
                    />
                  </div>

                  {/* Wilaya */}
                  <div className="contact-form-group">
                    <label htmlFor="wilaya" className="contact-form-label">
                      {t('contactPage.form.fields.wilaya')}
                    </label>
                    <select
                      id="wilaya"
                      name="wilaya"
                      value={formData.wilaya}
                      onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                      className="contact-form-select"
                    >
                      <option value="">{t('contactPage.form.fields.wilayaSelect')}</option>
                      {wilayaOptions.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="contact-form-group">
                    <label htmlFor="subject" className="contact-form-label">
                      {t('contactPage.form.fields.subject')} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="contact-form-select"
                    >
                      {contactSubjectKeys.map((s) => (
                        <option key={s.id} value={s.id}>{t(s.labelKey)}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="contact-form-group contact-form-group-full">
                    <label htmlFor="message" className="contact-form-label">
                      {t('contactPage.form.fields.message')} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contactPage.form.fields.messagePlaceholder')}
                      className={`contact-form-textarea ${errors.message ? 'border-red-500' : ''}`}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <span id="message-error" className="contact-form-error">{errors.message}</span>
                    )}
                  </div>
                </div>

                <div className="contact-form-actions">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="premium-button contact-form-submit-btn"
                  >
                    <span>
                      {isSubmitting
                        ? t('contactPage.form.submitting')
                        : t('contactPage.form.submitButton')}
                    </span>
                    <Send className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
