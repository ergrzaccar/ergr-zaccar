import type jsPDF from 'jspdf'

/**
 * Draws the official ERGR Zaccar header on a PDF page.
 * Dimensions are exact replicas from the official "En Tête.docx" file:
 *
 * Layout: Table with 2 columns + single black border
 * - Column 1 (logo): 3.26 cm wide
 * - Column 2 (text): 14.55 cm wide
 * - Total table width: 17.81 cm
 * - Logo: 2.57 cm × 3.57 cm
 * - Page margins: 1.40 cm left & right
 * - Font sizes: Arabic line 1 = 14pt, GGR = 14pt, Arabic line 2 = 16pt, FR = 14pt, Capital = 10pt
 * - All text: bold, font = Arial/system bidi
 * - Borders: single black 0.5pt
 *
 * Returns the Y position after the header for content placement.
 */
export async function drawPdfHeader(pdf: jsPDF): Promise<number> {
  // ── Page & margin constants from DOCX ──
  const marginLeft = 14 // 1.40 cm in mm
  const tableWidth = 178.1 // 17.81 cm in mm
  const col1Width = 32.6 // 3.26 cm in mm
  const col2Width = 145.5 // 14.55 cm in mm

  // ── Table position ──
  const tableX = marginLeft
  const tableY = 7 // header distance ~1.25cm from top = ~7mm after page margin
  const tableHeight = 40 // Height to contain all text lines

  // ── Draw table border (single black 0.5pt) ──
  pdf.setDrawColor(0, 0, 0)
  pdf.setLineWidth(0.18) // 0.5pt ≈ 0.18mm

  // Outer border
  pdf.rect(tableX, tableY, tableWidth, tableHeight)

  // Vertical divider between col1 and col2
  pdf.line(tableX + col1Width, tableY, tableX + col1Width, tableY + tableHeight)

  // ── Load and draw logo ──
  const logoImg = new Image()
  logoImg.crossOrigin = 'anonymous'
  try {
    await new Promise<void>((resolve, reject) => {
      logoImg.onload = () => resolve()
      logoImg.onerror = () => reject(new Error('Logo failed'))
      logoImg.src = '/images/logo-ergr-zaccar-hd.jpg'
    })
    // Logo dimensions from DOCX: 2.57 cm × 3.57 cm = 25.7mm × 35.7mm
    const logoW = 25.7
    const logoH = 35.7
    // Center logo in col1
    const logoX = tableX + (col1Width - logoW) / 2
    const logoY = tableY + (tableHeight - logoH) / 2
    pdf.addImage(logoImg, 'JPEG', logoX, logoY, logoW, logoH)
  } catch {
    // Continue without logo
  }

  // ── Text column (col2) ──
  const textCenterX = tableX + col1Width + col2Width / 2
  let textY = tableY + 7.5

  // Line 1: Arabic مجمع الهندسة الريفية — 14pt bold
  // jsPDF cannot render Arabic properly, so we skip this line or use a placeholder
  // The PDF will show the French text prominently instead

  // Line 2: GROUPE GENIE RURAL – G.G.R. — 14pt bold black
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(14)
  pdf.setTextColor(0, 0, 0)
  pdf.text('GROUPE GENIE RURAL – G.G.R. -', textCenterX, textY, { align: 'center' })

  // Line 3: المؤسسة الجهوية للهندسة الريفية- زكار — 16pt bold
  // (Arabic rendering limitation in jsPDF — skipped)

  // Line 4: Entreprise Régionale de Génie Rural – ZACCAR — 14pt bold
  textY += 9
  pdf.setFontSize(14)
  pdf.text('Entreprise Régionale de Génie Rural – ZACCAR', textCenterX, textY, { align: 'center' })

  // Line 5: Spa au capital social de 471.100.000 DA — 10pt bold
  textY += 9
  pdf.setFontSize(10)
  pdf.text('Spa au capital social de 471.100.000 DA', textCenterX, textY, { align: 'center' })

  // Reset text color
  pdf.setTextColor(0, 0, 0)

  // Return Y position after the header + spacing
  return tableY + tableHeight + 8
}

/** PDF page constants matching DOCX layout */
export const PDF_CONSTANTS = {
  PAGE_WIDTH: 210,
  MARGIN_LEFT: 14, // 1.40 cm
  MARGIN_RIGHT: 14, // 1.40 cm
  get CONTENT_WIDTH() {
    return this.PAGE_WIDTH - this.MARGIN_LEFT - this.MARGIN_RIGHT
  },
  get CENTER_X() {
    return this.PAGE_WIDTH / 2
  },
}
