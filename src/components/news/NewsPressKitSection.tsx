import { Download, FileArchive, FileSpreadsheet, FileText, Image } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { type PressKitItem, pressKitItems } from '../../data/newsPage'
import { Reveal } from '../animation/Reveal'

const iconMap: Record<string, typeof FileText> = {
  'dossier-presse-2026': FileText,
  'logos-charte-hd': Image,
  'photos-pack-chantiers': FileArchive,
  'fiche-chiffres-cles': FileSpreadsheet,
}

export function NewsPressKitSection() {
  const { t } = useTranslation()

  const handleDownload = async (item: PressKitItem) => {
    const { default: jsPDF } = await import('jspdf')
    const { drawPdfHeader, PDF_CONSTANTS } = await import('../../utils/pdfHeader')

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const { MARGIN_LEFT, CONTENT_WIDTH, CENTER_X } = PDF_CONSTANTS

    // ── Official Header ──
    let yPos = await drawPdfHeader(pdf)

    // ── Title ──
    yPos += 4
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(14)
    pdf.setTextColor(14, 59, 46)
    pdf.text('ESPACE PRESSE & KIT MÉDIA', CENTER_X, yPos, { align: 'center' })
    yPos += 8

    pdf.setDrawColor(180, 180, 180)
    pdf.setLineWidth(0.3)
    pdf.line(MARGIN_LEFT + 40, yPos, MARGIN_LEFT + CONTENT_WIDTH - 40, yPos)
    yPos += 12

    // ── Resource Name ──
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(12)
    pdf.setTextColor(30, 30, 30)
    pdf.text(t(item.titleKey), MARGIN_LEFT, yPos)
    yPos += 10

    // ── Specs Table ──
    const specs = [
      ['Format', item.format],
      ['Taille', item.size],
      ['Mise à jour', item.date],
    ]

    specs.forEach((row, i) => {
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

    // ── Description ──
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.setTextColor(14, 59, 46)
    pdf.text('DESCRIPTION :', MARGIN_LEFT, yPos)
    yPos += 6

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.setTextColor(30, 30, 30)
    const descLines = pdf.splitTextToSize(t(item.descKey), CONTENT_WIDTH)
    pdf.text(descLines, MARGIN_LEFT, yPos)
    yPos += descLines.length * 4.5 + 10

    // ── Rights ──
    pdf.setFillColor(240, 245, 240)
    pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 22, 'F')
    pdf.setDrawColor(14, 59, 46)
    pdf.setLineWidth(0.3)
    pdf.rect(MARGIN_LEFT, yPos, CONTENT_WIDTH, 22, 'S')

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8.5)
    pdf.setTextColor(14, 59, 46)
    pdf.text("DROITS D'UTILISATION", MARGIN_LEFT + 4, yPos + 5)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(50, 50, 50)
    pdf.text('Ressource mise à disposition pour la presse nationale,', MARGIN_LEFT + 4, yPos + 10)
    pdf.text('les institutions publiques et les partenaires officiels de l\'ERGR Zaccar.', MARGIN_LEFT + 4, yPos + 14)
    pdf.text('Mention obligatoire : "Crédit : ERGR Zaccar / Service Communication"', MARGIN_LEFT + 4, yPos + 18)

    yPos += 30

    // ── Contact ──
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8.5)
    pdf.setTextColor(14, 59, 46)
    pdf.text('CONTACT PRESSE', MARGIN_LEFT, yPos)
    yPos += 5
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(50, 50, 50)
    pdf.text('Cellule de Communication – Haouch Rouiba, BP 34, Rouiba 16012, Alger', MARGIN_LEFT, yPos)
    yPos += 4
    pdf.text('Email : presse@ergr-zaccar.dz', MARGIN_LEFT, yPos)

    const safeFilename = item.filename.replace(/\.[^/.]+$/, '')
    pdf.save(`${safeFilename}.pdf`)
  }

  return (
    <section id="news-press" className="news-press-section">
      <div className="site-container">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <p className="section-eyebrow">{t('newsPage.pressKit.eyebrow')}</p>
          <h2 className="section-heading mt-2">{t('newsPage.pressKit.title')}</h2>
          <p className="section-description mt-3">{t('newsPage.pressKit.description')}</p>
        </Reveal>

        <div className="news-press-grid">
          {pressKitItems.map((item, index) => {
            const IconComponent = iconMap[item.id] || FileText
            return (
              <Reveal key={item.id} delay={index * 0.1} className="news-press-card">
                <div className="news-press-card-header">
                  <span className="news-press-icon-wrap">
                    <IconComponent className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="news-format-tag">{item.format}</span>
                    <span className="text-[var(--text-tertiary)]">{item.size}</span>
                  </div>
                </div>

                <h3 className="news-press-card-title">{t(item.titleKey)}</h3>
                <p className="news-press-card-desc">{t(item.descKey)}</p>

                <div className="news-press-card-footer">
                  <span className="text-xs text-[var(--text-tertiary)] font-medium">
                    {item.date}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    className="news-press-download-btn"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    <span>{t('newsPage.pressKit.downloadBtn')}</span>
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
