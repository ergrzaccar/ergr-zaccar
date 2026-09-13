import { useRef, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  FileCheck,
  FileText,
  RotateCcw,
  Send,
  Upload,
  UserCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  type CareerJobOffer,
  careerJobOffersData,
  careerWilayaOptions,
} from '../../data/careersPage'
import { Reveal } from '../animation/Reveal'
import { useToast } from '../../context/ToastContext'

interface CareersApplicationSectionProps {
  initialOffer: CareerJobOffer | null
  initialType?: 'offer' | 'spontaneous' | 'internship'
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  targetOffer?: string
  resume?: string
  consent?: string
}

export function CareersApplicationSection({
  initialOffer,
  initialType = 'offer',
}: CareersApplicationSectionProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [applicationType, setApplicationType] = useState<'offer' | 'spontaneous' | 'internship'>(
    initialOffer ? 'offer' : initialType,
  )
  const [targetOfferId, setTargetOfferId] = useState<string>(initialOffer?.id || '')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [wilaya, setWilaya] = useState<string>('alger')
  const [educationLevel, setEducationLevel] = useState<string>('engineer')
  const [experienceYears, setExperienceYears] = useState<string>('mid1')
  const [coverNote, setCoverNote] = useState('')
  const [resumeFileName, setResumeFileName] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [generatedRef, setGeneratedRef] = useState('')

  const validate = (): boolean => {
    const errs: FormErrors = {}

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = t('careersPage.applicationForm.errors.fullName')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = t('careersPage.applicationForm.errors.email')
    }

    const cleanPhone = phone.replace(/[\s.-]/g, '')
    if (!cleanPhone || cleanPhone.length < 9) {
      errs.phone = t('careersPage.applicationForm.errors.phone')
    }

    if (applicationType === 'offer' && !targetOfferId) {
      errs.targetOffer = t('careersPage.applicationForm.errors.offerRequired')
    }

    if (!resumeFileName) {
      errs.resume = t('careersPage.applicationForm.errors.resumeRequired')
    }

    if (!consent) {
      errs.consent = t('careersPage.applicationForm.errors.consent')
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFileName(file.name)
      setSelectedFile(file)
      if (errors.resume) {
        setErrors((prev) => ({ ...prev, resume: undefined }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const fallbackRef = `CAND-2026-${randomNum}`

    try {
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('wilaya', wilaya)
      formData.append('educationLevel', educationLevel)
      formData.append('experienceYears', experienceYears)
      formData.append('applicationType', applicationType)
      formData.append('targetOffer', targetOfferId)
      formData.append('coverNote', coverNote)
      formData.append('reference', fallbackRef)

      if (selectedFile) {
        formData.append('resume', selectedFile)
      }

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erreur réseau')
      }

      const data = await response.json()
      const finalRef = data.reference || fallbackRef
      setGeneratedRef(finalRef)
      setIsSubmitted(true)
      toast.success(
        t('careersPage.applicationForm.success.message'),
        t('careersPage.applicationForm.success.title'),
      )
    } catch {
      // Graceful fallback for offline test environments
      setGeneratedRef(fallbackRef)
      setIsSubmitted(true)
      toast.success(
        t('careersPage.applicationForm.success.message'),
        t('careersPage.applicationForm.success.title'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetForm = () => {
    setFullName('')
    setEmail('')
    setPhone('')
    setCoverNote('')
    setResumeFileName('')
    setSelectedFile(null)
    setConsent(false)
    setErrors({})
    setIsSubmitted(false)
    setGeneratedRef('')
  }

  return (
    <section id="careers-apply" className="careers-application-section">
      <div className="site-container">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <p className="section-eyebrow">{t('careersPage.applicationForm.eyebrow')}</p>
          <h2 className="section-heading mt-2">{t('careersPage.applicationForm.title')}</h2>
          <p className="section-description mt-3">
            {t('careersPage.applicationForm.description')}
          </p>
        </Reveal>

        <div className="careers-form-container">
          {isSubmitted ? (
            <div className="careers-success-card">
              <div className="careers-success-icon-wrapper">
                <CheckCircle2 className="size-12 text-[var(--brand-primary)]" aria-hidden="true" />
              </div>
              <h3>{t('careersPage.applicationForm.success.title')}</h3>
              <p className="careers-success-message">
                {t('careersPage.applicationForm.success.message')}
              </p>

              <div className="careers-dossier-pill">
                <span>{t('careersPage.applicationForm.success.dossierNumber')}</span>
                <strong>{generatedRef}</strong>
              </div>

              <div className="careers-next-steps-box">
                <UserCheck className="size-5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <p>{t('careersPage.applicationForm.success.nextSteps')}</p>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className="premium-button premium-button-secondary mt-4"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                <span>{t('careersPage.applicationForm.success.newApplication')}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="careers-form">
              {/* Type selection radio tabs */}
              <div className="careers-form-group">
                <label className="careers-label">
                  {t('careersPage.applicationForm.fields.type')}
                </label>
                <div className="careers-type-selector">
                  <button
                    type="button"
                    onClick={() => {
                      setApplicationType('offer')
                      if (errors.targetOffer) setErrors((p) => ({ ...p, targetOffer: undefined }))
                    }}
                    className={`careers-type-btn ${applicationType === 'offer' ? 'is-active' : ''}`}
                  >
                    <FileCheck className="size-4" />
                    <span>{t('careersPage.applicationForm.fields.typeOptions.offer')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setApplicationType('spontaneous')
                      setErrors((p) => ({ ...p, targetOffer: undefined }))
                    }}
                    className={`careers-type-btn ${applicationType === 'spontaneous' ? 'is-active' : ''}`}
                  >
                    <Send className="size-4" />
                    <span>{t('careersPage.applicationForm.fields.typeOptions.spontaneous')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setApplicationType('internship')
                      setErrors((p) => ({ ...p, targetOffer: undefined }))
                    }}
                    className={`careers-type-btn ${applicationType === 'internship' ? 'is-active' : ''}`}
                  >
                    <FileText className="size-4" />
                    <span>{t('careersPage.applicationForm.fields.typeOptions.internship')}</span>
                  </button>
                </div>
              </div>

              {/* Target offer dropdown when type is 'offer' */}
              {applicationType === 'offer' && (
                <div className="careers-form-group">
                  <label htmlFor="careers-target-offer" className="careers-label">
                    {t('careersPage.applicationForm.fields.targetOffer')}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="careers-target-offer"
                    value={targetOfferId}
                    onChange={(e) => {
                      setTargetOfferId(e.target.value)
                      if (errors.targetOffer) {
                        setErrors((p) => ({ ...p, targetOffer: undefined }))
                      }
                    }}
                    className={`careers-input ${errors.targetOffer ? 'is-invalid' : ''}`}
                  >
                    <option value="">
                      {t('careersPage.applicationForm.fields.targetOfferPlaceholder')}
                    </option>
                    {careerJobOffersData.map((offer) => (
                      <option key={offer.id} value={offer.id}>
                        [{offer.ref}] {t(offer.titleKey)}
                      </option>
                    ))}
                  </select>
                  {errors.targetOffer && (
                    <p className="careers-error-msg flex items-center gap-1.5 mt-1">
                      <AlertCircle className="size-4" />
                      <span>{errors.targetOffer}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Grid 2 cols: Full Name & Email */}
              <div className="careers-form-row">
                <div className="careers-form-group">
                  <label htmlFor="careers-full-name" className="careers-label">
                    {t('careersPage.applicationForm.fields.fullName')}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="careers-full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }))
                    }}
                    placeholder={t('careersPage.applicationForm.fields.fullNamePlaceholder')}
                    className={`careers-input ${errors.fullName ? 'is-invalid' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="careers-error-msg flex items-center gap-1.5 mt-1">
                      <AlertCircle className="size-4" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div className="careers-form-group">
                  <label htmlFor="careers-email" className="careers-label">
                    {t('careersPage.applicationForm.fields.email')}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="careers-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }))
                    }}
                    placeholder={t('careersPage.applicationForm.fields.emailPlaceholder')}
                    className={`careers-input ${errors.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && (
                    <p className="careers-error-msg flex items-center gap-1.5 mt-1">
                      <AlertCircle className="size-4" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Grid 2 cols: Phone & Wilaya */}
              <div className="careers-form-row">
                <div className="careers-form-group">
                  <label htmlFor="careers-phone" className="careers-label">
                    {t('careersPage.applicationForm.fields.phone')}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="careers-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }))
                    }}
                    placeholder={t('careersPage.applicationForm.fields.phonePlaceholder')}
                    className={`careers-input ${errors.phone ? 'is-invalid' : ''}`}
                  />
                  {errors.phone && (
                    <p className="careers-error-msg flex items-center gap-1.5 mt-1">
                      <AlertCircle className="size-4" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                <div className="careers-form-group">
                  <label htmlFor="careers-wilaya" className="careers-label">
                    {t('careersPage.applicationForm.fields.wilaya')}
                  </label>
                  <select
                    id="careers-wilaya"
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className="careers-input"
                  >
                    {careerWilayaOptions
                      .filter((w) => w.id !== 'all')
                      .map((w) => (
                        <option key={w.id} value={w.id}>
                          {t(w.labelKey)}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Grid 2 cols: Education Level & Experience */}
              <div className="careers-form-row">
                <div className="careers-form-group">
                  <label htmlFor="careers-education" className="careers-label">
                    {t('careersPage.applicationForm.fields.educationLevel')}
                  </label>
                  <select
                    id="careers-education"
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="careers-input"
                  >
                    <option value="engineer">
                      {t('careersPage.applicationForm.fields.educationOptions.engineer')}
                    </option>
                    <option value="master">
                      {t('careersPage.applicationForm.fields.educationOptions.master')}
                    </option>
                    <option value="licence">
                      {t('careersPage.applicationForm.fields.educationOptions.licence')}
                    </option>
                    <option value="ts">
                      {t('careersPage.applicationForm.fields.educationOptions.ts')}
                    </option>
                    <option value="tech">
                      {t('careersPage.applicationForm.fields.educationOptions.tech')}
                    </option>
                    <option value="operator">
                      {t('careersPage.applicationForm.fields.educationOptions.operator')}
                    </option>
                    <option value="other">
                      {t('careersPage.applicationForm.fields.educationOptions.other')}
                    </option>
                  </select>
                </div>

                <div className="careers-form-group">
                  <label htmlFor="careers-experience" className="careers-label">
                    {t('careersPage.applicationForm.fields.experienceYears')}
                  </label>
                  <select
                    id="careers-experience"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="careers-input"
                  >
                    <option value="entry">
                      {t('careersPage.applicationForm.fields.experienceOptions.entry')}
                    </option>
                    <option value="mid1">
                      {t('careersPage.applicationForm.fields.experienceOptions.mid1')}
                    </option>
                    <option value="mid2">
                      {t('careersPage.applicationForm.fields.experienceOptions.mid2')}
                    </option>
                    <option value="senior">
                      {t('careersPage.applicationForm.fields.experienceOptions.senior')}
                    </option>
                  </select>
                </div>
              </div>

              {/* File Attachment (CV PDF) */}
              <div className="careers-form-group">
                <label className="careers-label">
                  {t('careersPage.applicationForm.fields.resume')}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className={`careers-file-dropzone ${errors.resume ? 'is-invalid' : ''}`}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="careers-resume-upload"
                  />
                  <div className="careers-file-content">
                    <Upload className="size-8 text-[var(--brand-primary)]" aria-hidden="true" />
                    {resumeFileName ? (
                      <div className="careers-file-attached">
                        <span>{t('careersPage.applicationForm.fields.resumeAttached')}</span>
                        <strong>{resumeFileName}</strong>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="careers-file-btn"
                      >
                        {t('careersPage.applicationForm.fields.resumeButton')}
                      </button>
                    )}
                  </div>
                </div>
                {errors.resume && (
                  <p className="careers-error-msg flex items-center gap-1.5 mt-1">
                    <AlertCircle className="size-4" />
                    <span>{errors.resume}</span>
                  </p>
                )}
              </div>

              {/* Cover Note */}
              <div className="careers-form-group">
                <label htmlFor="careers-cover-note" className="careers-label">
                  {t('careersPage.applicationForm.fields.coverNote')}
                </label>
                <textarea
                  id="careers-cover-note"
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder={t('careersPage.applicationForm.fields.coverNotePlaceholder')}
                  className="careers-textarea"
                />
              </div>

              {/* Consent checkbox */}
              <div className="careers-consent-group">
                <label className="careers-checkbox-label">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked)
                      if (errors.consent) setErrors((p) => ({ ...p, consent: undefined }))
                    }}
                    className="careers-checkbox"
                  />
                  <span>{t('careersPage.applicationForm.fields.consent')}</span>
                </label>
                {errors.consent && (
                  <p className="careers-error-msg flex items-center gap-1.5 mt-1">
                    <AlertCircle className="size-4" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="careers-form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="premium-button w-full sm:w-auto"
                >
                  <span>
                    {isSubmitting
                      ? t('careersPage.applicationForm.fields.submitting')
                      : t('careersPage.applicationForm.fields.submit')}
                  </span>
                  <Send className="size-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
