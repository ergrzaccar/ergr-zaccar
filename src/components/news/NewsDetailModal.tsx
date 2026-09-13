import { useEffect } from 'react'
import {
  Download,
  MapPin,
  Newspaper,
  User,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { NewsArticle, NewsCategory } from '../../data/newsPage'

interface NewsDetailModalProps {
  article: NewsArticle | null
  isOpen: boolean
  onClose: () => void
}

const categoryKeyMap: Record<Exclude<NewsCategory, 'all'>, string> = {
  'barrage-vert': 'newsPage.filters.categories.barrageVert',
  nurseries: 'newsPage.filters.categories.nurseries',
  'field-works': 'newsPage.filters.categories.fieldWorks',
  institutional: 'newsPage.filters.categories.institutional',
  emergency: 'newsPage.filters.categories.emergency',
}

export function NewsDetailModal({ article, isOpen, onClose }: NewsDetailModalProps) {
  const { t } = useTranslation()

  // Handle escape key & body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen || !article) return null

  const categoryLabel = categoryKeyMap[article.category]
    ? t(categoryKeyMap[article.category])
    : article.category

  const handleDownloadNotice = async () => {
    const { default: jsPDF } = await import('jspdf')
    const { drawPdfHeader, PDF_CONSTANTS } = await import('../../utils/pdfHeader')

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const { MARGIN_LEFT, CONTENT_WIDTH, CENTER_X } = PDF_CONSTANTS

    // ── Official Header ──
    let yPos = await drawPdfHeader(pdf)

    // ── Document Title ──
    yPos += 4
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(14)
    pdf.setTextColor(14, 59, 46)
    pdf.text('COMMUNIQUÉ DE PRESSE', CENTER_X, yPos, { align: 'center' })
    yPos += 8

    pdf.setDrawColor(180, 180, 180)
    pdf.setLineWidth(0.3)
    pdf.line(MARGIN_LEFT + 40, yPos, MARGIN_LEFT + CONTENT_WIDTH - 40, yPos)
    yPos += 10

    // ── Article Title ──
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(12)
    pdf.setTextColor(30, 30, 30)
    const titleLines = pdf.splitTextToSize(t(article.titleKey), CONTENT_WIDTH)
    pdf.text(titleLines, MARGIN_LEFT, yPos)
    yPos += titleLines.length * 5.5 + 8

    // ── Metadata ──
    const meta = [
      ['Catégorie', categoryLabel],
      ['Date', article.date],
      ['Rédigé par', t(article.authorKey)],
      ['Wilayas', article.wilayas.join(', ')],
    ]

    meta.forEach((row, i) => {
      const bgColor = i % 2 === 0 ? 245 : 255
      pdf.setFillColor(bgColor, bgColor, bgColor)
      pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 7, 'F')
      pdf.setDrawColor(220, 220, 220)
      pdf.setLineWidth(0.2)
      pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 7, 'S')
      pdf.line(MARGIN_LEFT + 45, yPos, MARGIN_LEFT + 45, yPos + 7)

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(8.5)
      pdf.setTextColor(60, 60, 60)
      pdf.text(row[0], MARGIN_LEFT + 3, yPos + 5)

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.setTextColor(30, 30, 30)
      pdf.text(row[1], MARGIN_LEFT + 48, yPos + 5)
      yPos += 7
    })

    yPos += 10

    // ── Summary ──
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.setTextColor(14, 59, 46)
    pdf.text('RÉSUMÉ :', MARGIN_LEFT, yPos)
    yPos += 6

    pdf.setFont('helvetica', 'italic')
    pdf.setFontSize(9)
    pdf.setTextColor(50, 50, 50)
    const summaryLines = pdf.splitTextToSize(t(article.summaryKey), CONTENT_WIDTH)
    pdf.text(summaryLines, MARGIN_LEFT, yPos)
    yPos += summaryLines.length * 4.5 + 8

    // ── Content ──
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.setTextColor(14, 59, 46)
    pdf.text('CONTENU :', MARGIN_LEFT, yPos)
    yPos += 6

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.setTextColor(30, 30, 30)
    const contentLines = pdf.splitTextToSize(t(article.contentKey), CONTENT_WIDTH)
    contentLines.forEach((line: string) => {
      if (yPos > 275) {
        pdf.addPage()
        yPos = 20
      }
      pdf.text(line, MARGIN_LEFT, yPos)
      yPos += 4.5
    })

    yPos += 8

    // ── Source box ──
    if (yPos > 255) { pdf.addPage(); yPos = 20 }
    pdf.setFillColor(240, 245, 240)
    pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 16, 'F')
    pdf.setDrawColor(14, 59, 46)
    pdf.setLineWidth(0.3)
    pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 16, 'S')

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8.5)
    pdf.setTextColor(14, 59, 46)
    pdf.text('SOURCE & CONTACT PRESSE', MARGIN_LEFT + 4, yPos + 5)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(50, 50, 50)
    pdf.text('Cellule de Communication – Haouch Rouiba, BP 34, Rouiba 16012, Alger', MARGIN_LEFT + 4, yPos + 10)
    pdf.text('Email : presse@ergr-zaccar.dz', MARGIN_LEFT + 4, yPos + 14)

    pdf.save(`Communique_${article.slug}.pdf`)
  }

  // Split content into paragraphs
  const paragraphs = t(article.contentKey).split('\n\n')

  return (
    <div
      className="news-modal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="news-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="news-modal-title"
      >
        {/* Modal Header */}
        <div className="news-modal-header">
          <div className="flex flex-wrap items-center gap-2">
            <span className="news-category-badge">{categoryLabel}</span>
            <span className="text-[var(--text-tertiary)]">•</span>
            <span className="text-xs text-[var(--text-secondary)] font-medium">
              {article.date} ({article.readTime})
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="news-modal-close-btn"
            aria-label={t('newsPage.modal.closeBtn')}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="news-modal-body">
          <div className="news-modal-title-box">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              <Newspaper className="size-4" aria-hidden="true" />
              <span>{t('newsPage.modal.title')}</span>
            </div>
            <h2 id="news-modal-title" className="news-modal-title">
              {t(article.titleKey)}
            </h2>
            <div className="news-modal-meta-bar">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <User className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
                <span>
                  {t('newsPage.modal.authorLabel')} <strong>{t(article.authorKey)}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <MapPin className="size-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
                <span>
                  {t('newsPage.modal.wilayasConcerned')} <strong>{article.wilayas.join(', ')}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Article Image */}
          <div className="news-modal-image-wrapper">
            <img
              src={article.image}
              alt={t(article.titleKey)}
              className="news-modal-image"
            />
          </div>

          {/* Key Figures Grid */}
          {article.keyFigures && article.keyFigures.length > 0 && (
            <div className="news-modal-figures-section">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                {t('newsPage.modal.keyFiguresTitle')}
              </h3>
              <div className="news-modal-figures-grid">
                {article.keyFigures.map((fig) => (
                  <div key={fig.labelKey} className="news-modal-figure-card">
                    <span className="news-modal-figure-value">{fig.value}</span>
                    <span className="news-modal-figure-label">{t(fig.labelKey)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article text paragraphs */}
          <div className="news-modal-paragraphs">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="news-modal-paragraph">
                {p}
              </p>
            ))}
          </div>

          {/* Institutional note footer */}
          <div className="news-modal-institution-box">
            <p className="text-xs text-[var(--text-secondary)]">
              Source officielle : <strong>Entreprise Régionale de Génie Rural Zaccar (ERGR Zaccar)</strong> • Filiale du Groupe Génie Rural (GGR) • Sous tutelle du Ministère de l’Agriculture et du Développement Rural.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="news-modal-footer">
          <button
            type="button"
            onClick={handleDownloadNotice}
            className="premium-button"
          >
            <Download className="size-4" aria-hidden="true" />
            <span>{t('newsPage.modal.downloadPdf')}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="premium-button premium-button-secondary"
          >
            <span>{t('newsPage.modal.closeBtn')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
