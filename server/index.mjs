import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
const PORT = process.env.PORT || 5000
const RECIPIENT_EMAIL = (process.env.RECIPIENT_EMAIL || 'zaccar.informatique@gmail.com').trim()

// Ensure local inbox storage directories exist
const inboxDir = path.resolve(__dirname, 'inbox')
const uploadsDir = path.resolve(inboxDir, 'uploads')
if (!fs.existsSync(inboxDir)) fs.mkdirSync(inboxDir, { recursive: true })
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Multer storage for uploaded CVs
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const timestamp = Date.now()
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
    cb(null, `${timestamp}-${safeName}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (ext === '.pdf' || file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Seuls les fichiers PDF sont acceptés pour le CV.'))
    }
  },
})

// Nodemailer SMTP Transporter helper (Google App Password)
function getTransporter() {
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : ''
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : ''

  if (!user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  })
}

// Format date helper
function getFormattedTimestamp() {
  const now = new Date()
  return now.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  })
}

// --------------------------------------------------------------------------
// 1. Health Check
// --------------------------------------------------------------------------
app.get('/api/health', (_req, res) => {
  const isSmtpConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
  res.json({
    status: 'ok',
    service: 'ERGR Zaccar Backend API',
    recipient: RECIPIENT_EMAIL,
    smtpConfigured: isSmtpConfigured,
    mode: isSmtpConfigured ? 'google_app_password_smtp' : 'local_inbox_simulation',
    timestamp: new Date().toISOString(),
  })
})

// --------------------------------------------------------------------------
// 2. Contact Form Submission
// --------------------------------------------------------------------------
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, organization, email, phone, wilaya, subject, message } = req.body

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Les champs nom, email et message sont obligatoires.',
      })
    }

    const reference =
      req.body.reference ||
      `ERGR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
    const timestamp = getFormattedTimestamp()

    const subjectLabels = {
      partnership: 'Partenariat institutionnel',
      procurement: 'Commande de plants / Pépinières',
      technical: 'Travaux forestiers & Rénovation',
      recruitment: 'Ressources humaines',
      other: 'Autre demande',
    }
    const readableSubject = subjectLabels[subject] || subject || 'Prise de contact générale'

    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f6f4; color: #1d2522; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e0e5e2; }
    .header { background: linear-gradient(135deg, #0e3b2e 0%, #1f6b45 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; color: #d7ba62; font-weight: 600; }
    .badge { display: inline-block; padding: 6px 14px; background: rgba(255,255,255,0.15); border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; }
    .content { padding: 28px 24px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
    .meta-table td { padding: 10px 12px; border-bottom: 1px solid #edf1ee; }
    .meta-table td.label { width: 35%; color: #6d7972; font-weight: 600; }
    .meta-table td.value { color: #1d2522; font-weight: 500; }
    .message-box { background: #fbfbf9; border-left: 4px solid #1f6b45; padding: 16px 18px; border-radius: 0 8px 8px 0; margin-top: 10px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .footer { background: #f8f9f8; padding: 18px 24px; text-align: center; font-size: 12px; color: #6d7972; border-top: 1px solid #edf1ee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ENTREPRISE RÉGIONALE DE GÉNIE RURAL — ZACCAR</h1>
      <p>Portail Institutionnel — Demande de Contact</p>
      <div class="badge">Réf : ${reference}</div>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr><td class="label">Date & Heure :</td><td class="value">${timestamp}</td></tr>
        <tr><td class="label">Expéditeur :</td><td class="value"><strong>${fullName}</strong></td></tr>
        <tr><td class="label">Organisme :</td><td class="value">${organization || 'Non renseigné'}</td></tr>
        <tr><td class="label">Adresse e-mail :</td><td class="value"><a href="mailto:${email}" style="color:#1f6b45; font-weight:600;">${email}</a></td></tr>
        <tr><td class="label">Téléphone :</td><td class="value">${phone || 'Non renseigné'}</td></tr>
        <tr><td class="label">Wilaya :</td><td class="value">${wilaya || 'Non renseignée'}</td></tr>
        <tr><td class="label">Objet :</td><td class="value"><strong>${readableSubject}</strong></td></tr>
      </table>

      <div style="font-weight: 600; font-size: 14px; color: #0e3b2e; margin-bottom: 6px;">Message transmis :</div>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer">
      Cet e-mail a été transmis depuis le formulaire de contact officiel du site ERGR Zaccar.<br>
      Pour répondre directement à l'expéditeur, cliquez sur Répondre (Reply-To : ${email}).
    </div>
  </div>
</body>
</html>`

    // Local audit archive
    const record = {
      reference,
      type: 'contact',
      timestamp,
      recipient: RECIPIENT_EMAIL,
      sender: { fullName, organization, email, phone, wilaya },
      subject: readableSubject,
      message,
    }
    fs.writeFileSync(
      path.join(inboxDir, `contact-${reference}.json`),
      JSON.stringify(record, null, 2),
      'utf-8',
    )

    const transporter = getTransporter()

    if (transporter) {
      await transporter.sendMail({
        from: `"ERGR Zaccar" <${process.env.SMTP_USER.trim()}>`,
        to: RECIPIENT_EMAIL,
        replyTo: `"${fullName}" <${email}>`,
        subject: `[ERGR Contact] ${reference} — ${readableSubject} (${fullName})`,
        html: htmlContent,
      })
      console.log(`[ERGR-MAIL] ✅ E-mail Google expédié vers ${RECIPIENT_EMAIL} (Réf: ${reference})`)
    } else {
      console.log(`[ERGR-MAIL] 💾 Message archivé localement dans server/inbox/contact-${reference}.json`)
    }

    return res.status(200).json({
      success: true,
      reference,
      message: 'Votre message a été transmis avec succès.',
      recipient: RECIPIENT_EMAIL,
    })
  } catch (error) {
    console.error('[ERGR-MAIL] ❌ Erreur lors du traitement du formulaire de contact :', error)
    return res.status(500).json({
      success: false,
      error: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
    })
  }
})

// --------------------------------------------------------------------------
// 3. Careers / Job Application Submission (with CV PDF upload)
// --------------------------------------------------------------------------
app.post('/api/careers/apply', upload.single('resume'), async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      wilaya,
      educationLevel,
      experienceYears,
      applicationType,
      targetOffer,
      coverNote,
    } = req.body

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Les champs nom complet, email et téléphone sont obligatoires.',
      })
    }

    const reference =
      req.body.reference ||
      `CAND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    const timestamp = getFormattedTimestamp()
    const cvFile = req.file

    const educationLabels = {
      phd: 'Doctorat / Magister',
      master: 'Master / Diplôme d’Ingénieur d’État (Bac+5)',
      licence: 'Licence / Licence professionnelle (Bac+3)',
      ts: 'Technicien Supérieur (TS)',
      tech: 'Technicien / CAP',
      operator: 'Opérateur qualifié / Conducteur d’engins',
      other: 'Autre formation',
    }

    const experienceLabels = {
      entry: 'Débutant / Moins d’un an',
      mid1: '1 à 3 ans',
      mid2: '3 à 5 ans',
      senior: 'Plus de 5 ans d’expérience',
    }

    const typeLabels = {
      offer: 'Réponse à un appel de recrutement ouvert',
      spontaneous: 'Candidature spontanée',
      internship: 'Stage pratique / Mémoire de fin d’études (PFE)',
    }

    const readableEducation = educationLabels[educationLevel] || educationLevel || 'Non renseigné'
    const readableExperience = experienceLabels[experienceYears] || experienceYears || 'Non renseigné'
    const readableType = typeLabels[applicationType] || applicationType || 'Candidature'

    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f6f4; color: #1d2522; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e0e5e2; }
    .header { background: linear-gradient(135deg, #0e3b2e 0%, #1f6b45 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; color: #d7ba62; font-weight: 600; }
    .badge { display: inline-block; padding: 6px 14px; background: rgba(255,255,255,0.15); border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; }
    .content { padding: 28px 24px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
    .meta-table td { padding: 10px 12px; border-bottom: 1px solid #edf1ee; }
    .meta-table td.label { width: 38%; color: #6d7972; font-weight: 600; }
    .meta-table td.value { color: #1d2522; font-weight: 500; }
    .attachment-card { background: #edf5f0; border: 1px solid #c2ded0; border-radius: 8px; padding: 12px 16px; margin-top: 16px; }
    .attachment-info { font-size: 13px; color: #0e3b2e; font-weight: 600; }
    .message-box { background: #fbfbf9; border-left: 4px solid #1f6b45; padding: 16px 18px; border-radius: 0 8px 8px 0; margin-top: 10px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .footer { background: #f8f9f8; padding: 18px 24px; text-align: center; font-size: 12px; color: #6d7972; border-top: 1px solid #edf1ee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ENTREPRISE RÉGIONALE DE GÉNIE RURAL — ZACCAR</h1>
      <p>Direction des Ressources Humaines — Dossier de Candidature</p>
      <div class="badge">Dossier : ${reference}</div>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr><td class="label">Date de soumission :</td><td class="value">${timestamp}</td></tr>
        <tr><td class="label">Candidat(e) :</td><td class="value"><strong>${fullName}</strong></td></tr>
        <tr><td class="label">Email :</td><td class="value"><a href="mailto:${email}" style="color:#1f6b45; font-weight:600;">${email}</a></td></tr>
        <tr><td class="label">Téléphone :</td><td class="value"><strong>${phone}</strong></td></tr>
        <tr><td class="label">Wilaya de résidence :</td><td class="value">${wilaya || 'Non renseignée'}</td></tr>
        <tr><td class="label">Niveau de formation :</td><td class="value">${readableEducation}</td></tr>
        <tr><td class="label">Expérience :</td><td class="value">${readableExperience}</td></tr>
        <tr><td class="label">Type de dossier :</td><td class="value"><strong>${readableType}</strong></td></tr>
        ${targetOffer ? `<tr><td class="label">Poste ciblé :</td><td class="value"><strong>${targetOffer}</strong></td></tr>` : ''}
      </table>

      ${
        cvFile
          ? `
      <div class="attachment-card">
        <div class="attachment-info">
          📎 CV joint : ${cvFile.originalname} (${(cvFile.size / 1024).toFixed(1)} Ko)
        </div>
        <div style="font-size:12px; color:#1f6b45; margin-top:4px; font-weight:600;">[Fichier PDF attaché au présent e-mail]</div>
      </div>`
          : '<div style="color:#dc2626; font-size:13px; margin-top:10px;">⚠️ Aucun fichier CV joint</div>'
      }

      ${
        coverNote
          ? `
      <div style="font-weight: 600; font-size: 14px; color: #0e3b2e; margin-top: 20px; margin-bottom: 6px;">Note / Motivation du candidat :</div>
      <div class="message-box">${coverNote}</div>`
          : ''
      }
    </div>
    <div class="footer">
      Dossier transmis depuis le module recrutement du site web ERGR Zaccar.<br>
      Pour répondre directement au candidat, cliquez sur Répondre (Reply-To : ${email}).
    </div>
  </div>
</body>
</html>`

    // Local audit archive
    const record = {
      reference,
      type: 'candidature',
      timestamp,
      recipient: RECIPIENT_EMAIL,
      candidate: {
        fullName,
        email,
        phone,
        wilaya,
        educationLevel: readableEducation,
        experienceYears: readableExperience,
        applicationType: readableType,
        targetOffer,
        coverNote,
        cvFileName: cvFile ? cvFile.originalname : null,
        cvStoredPath: cvFile ? cvFile.path : null,
      },
    }
    fs.writeFileSync(
      path.join(inboxDir, `candidature-${reference}.json`),
      JSON.stringify(record, null, 2),
      'utf-8',
    )

    const transporter = getTransporter()

    const attachments = []
    if (cvFile) {
      attachments.push({
        filename: cvFile.originalname,
        path: cvFile.path,
      })
    }

    if (transporter) {
      await transporter.sendMail({
        from: `"ERGR Zaccar Recrutement" <${process.env.SMTP_USER.trim()}>`,
        to: RECIPIENT_EMAIL,
        replyTo: `"${fullName}" <${email}>`,
        subject: `[ERGR Recrutement] ${reference} — ${fullName} (${readableEducation})`,
        html: htmlContent,
        attachments,
      })
      console.log(`[ERGR-CANDIDATURE] ✅ Dossier avec CV PDF envoyé via Google vers ${RECIPIENT_EMAIL} (Réf: ${reference})`)
    } else {
      console.log(`[ERGR-CANDIDATURE] 💾 Dossier archivé localement dans server/inbox/candidature-${reference}.json`)
    }

    return res.status(200).json({
      success: true,
      reference,
      message: 'Votre candidature a été transmise avec succès.',
      recipient: RECIPIENT_EMAIL,
    })
  } catch (error) {
    console.error('[ERGR-CANDIDATURE] ❌ Erreur lors du traitement de la candidature :', error)
    return res.status(500).json({
      success: false,
      error: "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer.",
    })
  }
})

// Start server
app.listen(PORT, () => {
  const isConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
  console.log(`\n======================================================`)
  console.log(` 🌲 SERVEUR BACKEND ERGR ZACCAR OPÉRATIONNEL (SOLUTION 2)`)
  console.log(` • Port           : http://localhost:${PORT}`)
  console.log(` • Destinataire   : ${RECIPIENT_EMAIL}`)
  console.log(` • Expéditeur     : ${process.env.SMTP_USER || 'Non configuré'}`)
  console.log(` • Mode           : ${isConfigured ? 'Google App Password SMTP (Envoi direct)' : 'Simulation locale'}`)
  console.log(` • Endpoint Santé : http://localhost:${PORT}/api/health`)
  console.log(` • Form Contact   : POST http://localhost:${PORT}/api/contact`)
  console.log(` • Recrutement    : POST http://localhost:${PORT}/api/careers/apply`)
  console.log(`======================================================\n`)

  // Test SMTP connection immediately
  const transporter = getTransporter()
  if (transporter) {
    transporter.verify((err) => {
      if (err) {
        console.error(`[ERGR-SMTP] ❌ Échec d'authentification Google :`, err.message)
      } else {
        console.log(`[ERGR-SMTP] 🚀 Authentification Google réussie ! Prêt pour expédier vers ${RECIPIENT_EMAIL}`)
      }
    })
  }
})
