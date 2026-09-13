import { useEffect } from 'react'
import {
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  Download,
  FileCheck,
  FileText,
  FolderLock,
  Hourglass,
  MapPin,
  Scale,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { TenderDomain, TenderItem, TenderStatus } from '../../data/tendersPage'

interface TenderDetailModalProps {
  tender: TenderItem | null
  isOpen: boolean
  onClose: () => void
}

const domainKeyMap: Record<Exclude<TenderDomain, 'all'>, string> = {
  'civil-engineering': 'tendersPage.filters.domainCivil',
  gabions: 'tendersPage.filters.domainGabions',
  machinery: 'tendersPage.filters.domainMachinery',
  nurseries: 'tendersPage.filters.domainNurseries',
  studies: 'tendersPage.filters.domainStudies',
}

const statusConfig: Record<
  Exclude<TenderStatus, 'all'>,
  { labelKey: string; className: string; icon: typeof Clock }
> = {
  open: {
    labelKey: 'tendersPage.card.statusOpen',
    className: 'status-open',
    icon: Clock,
  },
  evaluating: {
    labelKey: 'tendersPage.card.statusEvaluating',
    className: 'status-evaluating',
    icon: Hourglass,
  },
  awarded: {
    labelKey: 'tendersPage.card.statusAwarded',
    className: 'status-awarded',
    icon: Award,
  },
  cancelled: {
    labelKey: 'tendersPage.card.statusCancelled',
    className: 'status-cancelled',
    icon: AlertTriangle,
  },
}

export function TenderDetailModal({ tender, isOpen, onClose }: TenderDetailModalProps) {
  const { t } = useTranslation()

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen || !tender) return null

  const statusInfo = statusConfig[tender.status]
  const StatusIcon = statusInfo.icon
  const domainLabel = domainKeyMap[tender.domain] ? t(domainKeyMap[tender.domain]) : tender.domain

  const handleDownloadNotice = async () => {
    // Dynamic import for code-splitting
    const { default: jsPDF } = await import('jspdf')
    const { drawPdfHeader, PDF_CONSTANTS } = await import('../../utils/pdfHeader')

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const { MARGIN_LEFT, CONTENT_WIDTH, CENTER_X } = PDF_CONSTANTS

    // ── Official Header (exact DOCX replica) ─────────────
    let yPos = await drawPdfHeader(pdf)

    // ── Document Title ───────────────────────────────────

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(14)
    pdf.setTextColor(0, 0, 0)
    pdf.text('AVIS DE MARCHÉ PUBLIC / CONSULTATION', CENTER_X, yPos, { align: 'center' })

    yPos += 10

    // Thin line under title
    pdf.setDrawColor(180, 180, 180)
    pdf.setLineWidth(0.3)
    pdf.line(MARGIN_LEFT + 30, yPos, MARGIN_LEFT + CONTENT_WIDTH - 30, yPos)

    yPos += 10

    // ── Reference & Status ───────────────────────────────
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`Référence : ${tender.reference}`, MARGIN_LEFT, yPos)

    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(80, 80, 80)
    pdf.text(`Statut : ${t(statusInfo.labelKey)}`, MARGIN_LEFT + CONTENT_WIDTH / 2 + 10, yPos)

    yPos += 12

    // ── Objet ────────────────────────────────────────────
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.setTextColor(0, 0, 0)
    pdf.text('OBJET :', MARGIN_LEFT, yPos)
    yPos += 6

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.setTextColor(30, 30, 30)
    const titleLines = pdf.splitTextToSize(t(tender.titleKey), CONTENT_WIDTH)
    pdf.text(titleLines, MARGIN_LEFT, yPos)
    yPos += titleLines.length * 5 + 8

    // ── Specifications Table ─────────────────────────────
    const specs = [
      ['Domaine', domainLabel],
      ['Lieu d\'exécution', tender.location],
      ['Wilayas concernées', tender.wilayas.join(', ')],
      ['Date de publication', tender.publishDate],
      ['Date limite de dépôt', `${tender.deadlineDate} à ${tender.openingTime}`],
      ['Frais de retrait du CDC', tender.cdcFee],
      ['Caution de soumission', tender.bankGuarantee],
    ]

    // Table header
    pdf.setFillColor(0, 0, 0)
    pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 8, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.setTextColor(255, 255, 255)
    pdf.text('SPÉCIFICATIONS', CENTER_X, yPos + 5.5, { align: 'center' })
    yPos += 10

    // Table rows
    specs.forEach((row, i) => {
      const bgColor = i % 2 === 0 ? 245 : 255
      pdf.setFillColor(bgColor, bgColor, bgColor)
      pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 8, 'F')

      // Borders
      pdf.setDrawColor(220, 220, 220)
      pdf.setLineWidth(0.2)
      pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 8, 'S')
      pdf.line(MARGIN_LEFT + 55, yPos, MARGIN_LEFT + 55, yPos + 8)

      // Label
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(8.5)
      pdf.setTextColor(60, 60, 60)
      pdf.text(row[0], MARGIN_LEFT + 3, yPos + 5.5)

      // Value
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.setTextColor(30, 30, 30)
      pdf.text(row[1], MARGIN_LEFT + 58, yPos + 5.5)

      yPos += 8
    })

    yPos += 10

    // ── Qualification ────────────────────────────────────
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.setTextColor(0, 0, 0)
    pdf.text('QUALIFICATION EXIGÉE :', MARGIN_LEFT, yPos)
    yPos += 6

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.setTextColor(30, 30, 30)
    const qualLines = pdf.splitTextToSize(t(tender.qualificationKey), CONTENT_WIDTH)
    pdf.text(qualLines, MARGIN_LEFT, yPos)
    yPos += qualLines.length * 4.5 + 10

    // ── Composition du dossier ───────────────────────────
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.setTextColor(0, 0, 0)
    pdf.text('COMPOSITION DU DOSSIER (Décret Présidentiel 15-247) :', MARGIN_LEFT, yPos)
    yPos += 7

    const folders = [
      '1. Dossier de candidature',
      '2. Offre technique',
      '3. Offre financière',
    ]
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.setTextColor(30, 30, 30)
    folders.forEach((folder) => {
      pdf.text(`    ${folder}`, MARGIN_LEFT, yPos)
      yPos += 5.5
    })

    yPos += 8

    // ── Dépôt des offres ─────────────────────────────────
    pdf.setFillColor(240, 245, 240)
    pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 22, 'F')
    pdf.setDrawColor(0, 0, 0)
    pdf.setLineWidth(0.3)
    pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 22, 'S')

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.setTextColor(0, 0, 0)
    pdf.text('DÉPÔT DES OFFRES', MARGIN_LEFT + 4, yPos + 6)

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8.5)
    pdf.setTextColor(50, 50, 50)
    pdf.text('Bureau des Marchés – Haouch Rouiba, BP 34, Rouiba 16012, Alger', MARGIN_LEFT + 4, yPos + 12)
    pdf.text('Email : marches@ergr-zaccar.dz', MARGIN_LEFT + 4, yPos + 17)

    // ── Save PDF ─────────────────────────────────────────
    const safeRef = tender.reference.replace(/[^a-zA-Z0-9]/g, '_')
    pdf.save(`Avis_${safeRef}.pdf`)
  }

  return (
    <div
      className="tenders-modal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="tenders-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tender-modal-title"
      >
        {/* Modal Header */}
        <div className="tenders-modal-header">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tenders-card-reference font-mono">{tender.reference}</span>
            <span className={`tenders-status-badge ${statusInfo.className}`}>
              <StatusIcon className="size-3.5" aria-hidden="true" />
              <span>{t(statusInfo.labelKey)}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="tenders-modal-close-btn"
            aria-label={t('tendersPage.modal.closeBtn')}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="tenders-modal-body">
          <div className="tenders-modal-title-box">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                {t('tendersPage.modal.title')}
              </span>
              <span className="text-[var(--text-tertiary)]">•</span>
              <span className="tenders-card-domain-badge !mb-0">{domainLabel}</span>
            </div>
            <h2 id="tender-modal-title" className="tenders-modal-title">
              {t(tender.titleKey)}
            </h2>
            <p className="tenders-modal-summary">{t(tender.summaryKey)}</p>
          </div>

          {/* Key Specifications Grid */}
          <div className="tenders-modal-specs-grid">
            <div className="tenders-modal-spec-card">
              <span className="tenders-spec-label">
                <MapPin className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                {t('tendersPage.modal.locationLabel')}
              </span>
              <span className="tenders-spec-value">{tender.location}</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {tender.wilayas.map((w) => (
                  <span key={w} className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--text-secondary)] font-medium">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <div className="tenders-modal-spec-card">
              <span className="tenders-spec-label">
                <Calendar className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                {t('tendersPage.modal.publishDateLabel')}
              </span>
              <span className="tenders-spec-value">{tender.publishDate}</span>
            </div>

            <div className="tenders-modal-spec-card">
              <span className="tenders-spec-label">
                <Clock className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                {t('tendersPage.modal.deadlineLabel')}
              </span>
              <span className="tenders-spec-value text-[var(--brand-primary)] font-bold">
                {tender.deadlineDate} ({tender.openingTime})
              </span>
            </div>

            <div className="tenders-modal-spec-card">
              <span className="tenders-spec-label">
                <FileCheck className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                {t('tendersPage.modal.openingLabel')}
              </span>
              <span className="tenders-spec-value">
                {tender.deadlineDate} à {tender.openingTime}
              </span>
            </div>

            <div className="tenders-modal-spec-card">
              <span className="tenders-spec-label">
                <Coins className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                {t('tendersPage.modal.feeLabel')}
              </span>
              <span className="tenders-spec-value font-semibold">{tender.cdcFee}</span>
            </div>

            <div className="tenders-modal-spec-card">
              <span className="tenders-spec-label">
                <ShieldCheck className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                {t('tendersPage.modal.guaranteeLabel')}
              </span>
              <span className="tenders-spec-value font-semibold">{tender.bankGuarantee}</span>
            </div>
          </div>

          {/* Minimal Qualification */}
          <div className="tenders-modal-qualification-box">
            <div className="flex items-center gap-2 font-bold text-[var(--text-primary)] mb-1">
              <Scale className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
              <span>{t('tendersPage.modal.qualificationLabel')}</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {t(tender.qualificationKey)}
            </p>
          </div>

          {/* Regulatory 3 Envelopes */}
          <div className="tenders-modal-folders-section">
            <div className="flex items-center gap-2 font-bold text-[var(--text-primary)] mb-3">
              <FolderLock className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
              <h3>{t('tendersPage.modal.dossierCompositionTitle')}</h3>
            </div>
            <div className="space-y-2">
              <div className="tenders-folder-item">
                <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-[var(--text-secondary)]">{t('tendersPage.modal.dossierFolder1')}</p>
              </div>
              <div className="tenders-folder-item">
                <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-[var(--text-secondary)]">{t('tendersPage.modal.dossierFolder2')}</p>
              </div>
              <div className="tenders-folder-item">
                <CheckCircle2 className="size-4 text-[var(--brand-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-[var(--text-secondary)]">{t('tendersPage.modal.dossierFolder3')}</p>
              </div>
            </div>
          </div>

          {/* Instructions and public opening */}
          <div className="tenders-modal-instructions-box">
            <div className="flex items-center gap-2 font-bold text-[var(--brand-primary)] mb-1">
              <FileText className="size-4" aria-hidden="true" />
              <h4>{t('tendersPage.modal.instructionsTitle')}</h4>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {t('tendersPage.modal.instructionsText')}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="tenders-modal-footer">
          <button
            type="button"
            onClick={handleDownloadNotice}
            className="premium-button"
          >
            <Download className="size-4" aria-hidden="true" />
            <span>{t('tendersPage.modal.downloadNoticeBtn')}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="premium-button premium-button-secondary"
          >
            <span>{t('tendersPage.modal.closeBtn')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
