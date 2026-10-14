import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
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
const subscribersFile = path.resolve(inboxDir, 'subscribers.json')

if (!fs.existsSync(inboxDir)) fs.mkdirSync(inboxDir, { recursive: true })
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

// Helper to read subscribers
function getSubscribers() {
  if (!fs.existsSync(subscribersFile)) {
    return []
  }
  try {
    const raw = fs.readFileSync(subscribersFile, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

// Helper to save subscribers
function saveSubscribers(subscribers) {
  fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2), 'utf8')
}

// Helper to generate the official corporate letterhead table for emails (Optimized for Mobile & Desktop)
function getOfficialEmailHeaderHtml() {
  return `
  <table cellpadding="0" cellspacing="0" border="0" width="100%" class="official-header-table" style="width:100%; max-width:100%; border:1.5px solid #0e3b2e; border-collapse:collapse; background-color:#ffffff; margin-bottom:18px; table-layout:fixed;">
    <tr>
      <td class="official-header-logo-td" width="62" style="width:62px; min-width:52px; max-width:68px; padding:6px 4px; border-right:1.5px solid #0e3b2e; text-align:center; vertical-align:middle; background-color:#ffffff;">
        <img src="cid:ergr-logo@official" alt="ERGR Zaccar" class="official-header-logo-img" style="width:46px; max-width:100%; height:auto; display:block; margin:0 auto; border:0;" />
      </td>
      <td class="official-header-text-td" style="padding:6px 6px; text-align:center; vertical-align:middle; background-color:#ffffff; font-family:Arial, Helvetica, sans-serif; overflow:hidden;">
        <div class="hdr-txt-ar-ggr" style="font-size:11px; font-weight:bold; color:#0e3b2e; font-family:'Amiri', Tahoma, Arial, sans-serif; line-height:1.2; margin:0 0 1px 0; white-space:nowrap;">مـجـمـع الـهـنـدسـة الـريـفـيـة</div>
        <div class="hdr-txt-fr-ggr" style="font-size:9.5px; font-weight:bold; color:#0e3b2e; letter-spacing:0.3px; line-height:1.2; margin:0 0 3px 0; white-space:nowrap;">GROUPE GENIE RURAL – G.G.R.</div>
        <div class="hdr-txt-ar-ergr" style="font-size:12px; font-weight:bold; color:#006233; font-family:'Amiri', Tahoma, Arial, sans-serif; line-height:1.2; margin:0 0 1px 0; white-space:nowrap;">المؤسسة الجهوية للهندسة الريفية - زكار</div>
        <div class="hdr-txt-fr-ergr" style="font-size:10px; font-weight:bold; color:#006233; line-height:1.2; margin:0 0 3px 0; white-space:nowrap;">Entreprise Régionale de Génie Rural – ZACCAR</div>
        <div class="hdr-txt-capital" style="font-size:8px; font-weight:bold; color:#555555; text-transform:uppercase; letter-spacing:0.2px; line-height:1.2; white-space:nowrap; margin:0;">Spa au capital social de 471.100.000 DA</div>
      </td>
    </tr>
  </table>
  `
}

function getEmailLogoAttachments() {
  const localLogo = path.resolve(__dirname, 'assets/logo-ergr-zaccar.png')
  const fallbackLogo = path.resolve(__dirname, '../public/images/logo-ergr-zaccar.png')
  const logoPath = fs.existsSync(localLogo) ? localLogo : (fs.existsSync(fallbackLogo) ? fallbackLogo : null)

  if (!logoPath) return []
  return [
    {
      filename: 'logo-ergr-zaccar.png',
      path: logoPath,
      cid: 'ergr-logo@official',
    },
  ]
}

// Security: Disable Express fingerprinting
app.disable('x-powered-by')

// Security: Whitelist CORS origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : [
      'https://ergr-zaccar.dz',
      'https://www.ergr-zaccar.dz',
      'http://localhost:5173',
      'http://localhost:5000',
      'http://localhost',
      'http://127.0.0.1:5173',
      'http://127.0.0.1',
    ]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true)
      }
      return callback(new Error('CORS: Origine non autorisée.'))
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  }),
)

// Security: Limit JSON payload to 256kb to prevent memory exhaustion (DoS)
app.use(express.json({ limit: '256kb' }))
app.use(express.urlencoded({ extended: true, limit: '256kb' }))

// Security: In-memory sliding-window IP Rate Limiter
function createRateLimiter({ windowMs, max, message }) {
  const hits = new Map()

  setInterval(() => {
    const now = Date.now()
    for (const [ip, data] of hits.entries()) {
      if (now > data.resetTime) {
        hits.delete(ip)
      }
    }
  }, 60000).unref()

  return (req, res, next) => {
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown'
    const now = Date.now()
    const entry = hits.get(clientIp)

    if (!entry || now > entry.resetTime) {
      hits.set(clientIp, { count: 1, resetTime: now + windowMs })
      return next()
    }

    entry.count++
    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
      res.setHeader('Retry-After', retryAfter)
      return res.status(429).json({
        success: false,
        error: message || 'Trop de requêtes. Veuillez patienter avant de réessayer.',
      })
    }

    next()
  }
}

// 5 submissions per 15 min per IP (protects SMTP 500/day quota & prevents DoS)
const formRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Limite de soumission atteinte (maximum 5 par 15 minutes). Veuillez réessayer plus tard.',
})

// 10 alert subscriptions per 15 min per IP
const subscribeRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Trop de demandes d’abonnement depuis cette adresse IP. Veuillez patienter.',
})

// Security: HTML escaping helper to prevent Email HTML Injection (CWE-79 / CWE-80)
function escapeHtml(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Security: Fixed public base URL to prevent Host Header Poisoning
function getAppBaseUrl(req) {
  if (process.env.APP_BASE_URL) {
    return process.env.APP_BASE_URL.replace(/\/+$/, '')
  }
  const host = req.get('host') || 'localhost'
  const safeHost = /^[a-zA-Z0-9.:-]+$/.test(host) ? host : 'localhost'
  const protocol =
    req.protocol === 'https' || req.headers['x-forwarded-proto'] === 'https'
      ? 'https'
      : 'http'
  return `${protocol}://${safeHost}`
}

// Security: Admin API Key verification for protected endpoints (/api/alerts/broadcast, stats)
const ADMIN_API_KEY = (process.env.ADMIN_API_KEY || 'ergr-zaccar-admin-secret-2026').trim()

function verifyAdminKey(req, res, next) {
  const providedKey = (
    req.headers['x-admin-key'] ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : '') ||
    ''
  ).trim()

  if (!providedKey) {
    return res.status(401).json({
      success: false,
      error: 'Authentification requise : clé d’administration manquante (en-tête x-admin-key).',
    })
  }

  const keyBuffer = Buffer.from(providedKey)
  const expectedBuffer = Buffer.from(ADMIN_API_KEY)

  // Constant-time comparison to prevent timing attacks
  if (
    keyBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(keyBuffer, expectedBuffer)
  ) {
    return res.status(403).json({
      success: false,
      error: 'Accès refusé : clé d’administration invalide.',
    })
  }

  next()
}

// Multer storage for uploaded CVs
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const timestamp = Date.now()
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
    cb(null, `${timestamp}-${safeName}`)
  },
})

// Security: Strict Multer filter (ext === .pdf AND mimetype === application/pdf)
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (ext === '.pdf' && file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Seuls les fichiers PDF authentiques (.pdf) sont acceptés pour le CV.'))
    }
  },
})

// Security: Binary Magic Bytes verification (checks %PDF- header: 0x25, 0x50, 0x44, 0x46)
function isValidPdfBuffer(filePath) {
  try {
    const fd = fs.openSync(filePath, 'r')
    const buffer = Buffer.alloc(5)
    fs.readSync(fd, buffer, 0, 5, 0)
    fs.closeSync(fd)
    return buffer.toString('utf8').startsWith('%PDF')
  } catch {
    return false
  }
}

// Security & Loi 18-07: Automatic file retention policy (purges uploads older than 90 days)
function purgeOldUploads() {
  const maxAgeMs = 90 * 24 * 60 * 60 * 1000 // 90 days max retention
  const now = Date.now()

  try {
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir)
      for (const file of files) {
        const filePath = path.join(uploadsDir, file)
        const stats = fs.statSync(filePath)
        if (now - stats.mtimeMs > maxAgeMs) {
          fs.unlinkSync(filePath)
          console.log(`[Loi 18-07] 🗑️ Purge automatique du CV expiré : ${file}`)
        }
      }
    }
  } catch (err) {
    console.error('[Loi 18-07] Erreur lors de la purge :', err.message)
  }
}
purgeOldUploads()
setInterval(purgeOldUploads, 24 * 60 * 60 * 1000).unref()

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
// 2. Contact Form Submission (with Rate Limiting & HTML Escaping)
// --------------------------------------------------------------------------
app.post('/api/contact', formRateLimiter, async (req, res) => {
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
      <div class="badge">Réf : ${escapeHtml(reference)}</div>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr><td class="label">Date & Heure :</td><td class="value">${escapeHtml(timestamp)}</td></tr>
        <tr><td class="label">Expéditeur :</td><td class="value"><strong>${escapeHtml(fullName)}</strong></td></tr>
        <tr><td class="label">Organisme :</td><td class="value">${escapeHtml(organization) || 'Non renseigné'}</td></tr>
        <tr><td class="label">Adresse e-mail :</td><td class="value"><a href="mailto:${escapeHtml(email)}" style="color:#1f6b45; font-weight:600;">${escapeHtml(email)}</a></td></tr>
        <tr><td class="label">Téléphone :</td><td class="value">${escapeHtml(phone) || 'Non renseigné'}</td></tr>
        <tr><td class="label">Wilaya :</td><td class="value">${escapeHtml(wilaya) || 'Non renseignée'}</td></tr>
        <tr><td class="label">Objet :</td><td class="value"><strong>${escapeHtml(readableSubject)}</strong></td></tr>
      </table>

      <div style="font-weight: 600; font-size: 14px; color: #0e3b2e; margin-bottom: 6px;">Message transmis :</div>
      <div class="message-box">${escapeHtml(message)}</div>
    </div>
    <div class="footer">
      Cet e-mail a été transmis depuis le formulaire de contact officiel du site ERGR Zaccar.<br>
      Pour répondre directement à l'expéditeur, cliquez sur Répondre (Reply-To : ${escapeHtml(email)}).
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
      const sanitizedName = String(fullName).replace(/["\r\n]/g, '').trim()
      const sanitizedEmail = String(email).replace(/[\r\n]/g, '').trim()
      await transporter.sendMail({
        from: `"ERGR Zaccar" <${process.env.SMTP_USER.trim()}>`,
        to: RECIPIENT_EMAIL,
        replyTo: `"${sanitizedName}" <${sanitizedEmail}>`,
        subject: `[ERGR Contact] ${reference} — ${readableSubject} (${sanitizedName})`,
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
// 3. Careers / Job Application Submission (with CV PDF upload & Magic Bytes validation)
// --------------------------------------------------------------------------
app.post('/api/careers/apply', formRateLimiter, upload.single('resume'), async (req, res) => {
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

    const cvFile = req.file

    // Security: Strict Binary Magic Bytes verification for uploaded CV
    if (cvFile) {
      if (!isValidPdfBuffer(cvFile.path)) {
        try {
          fs.unlinkSync(cvFile.path)
        } catch {}
        return res.status(400).json({
          success: false,
          error: 'Le fichier transmis n’est pas un document PDF authentique (signature de fichier %PDF- invalide).',
        })
      }
    }

    const reference =
      req.body.reference ||
      `CAND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    const timestamp = getFormattedTimestamp()

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
      <div class="badge">Dossier : ${escapeHtml(reference)}</div>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr><td class="label">Date de soumission :</td><td class="value">${escapeHtml(timestamp)}</td></tr>
        <tr><td class="label">Candidat(e) :</td><td class="value"><strong>${escapeHtml(fullName)}</strong></td></tr>
        <tr><td class="label">Email :</td><td class="value"><a href="mailto:${escapeHtml(email)}" style="color:#1f6b45; font-weight:600;">${escapeHtml(email)}</a></td></tr>
        <tr><td class="label">Téléphone :</td><td class="value"><strong>${escapeHtml(phone)}</strong></td></tr>
        <tr><td class="label">Wilaya de résidence :</td><td class="value">${escapeHtml(wilaya) || 'Non renseignée'}</td></tr>
        <tr><td class="label">Niveau de formation :</td><td class="value">${escapeHtml(readableEducation)}</td></tr>
        <tr><td class="label">Expérience :</td><td class="value">${escapeHtml(readableExperience)}</td></tr>
        <tr><td class="label">Type de dossier :</td><td class="value"><strong>${escapeHtml(readableType)}</strong></td></tr>
        ${targetOffer ? `<tr><td class="label">Poste ciblé :</td><td class="value"><strong>${escapeHtml(targetOffer)}</strong></td></tr>` : ''}
      </table>

      ${
        cvFile
          ? `
      <div class="attachment-card">
        <div class="attachment-info">
          📎 CV joint : ${escapeHtml(cvFile.originalname)} (${(cvFile.size / 1024).toFixed(1)} Ko)
        </div>
        <div style="font-size:12px; color:#1f6b45; margin-top:4px; font-weight:600;">[Fichier PDF attaché au présent e-mail]</div>
      </div>`
          : '<div style="color:#dc2626; font-size:13px; margin-top:10px;">⚠️ Aucun fichier CV joint</div>'
      }

      ${
        coverNote
          ? `
      <div style="font-weight: 600; font-size: 14px; color: #0e3b2e; margin-top: 20px; margin-bottom: 6px;">Note / Motivation du candidat :</div>
      <div class="message-box">${escapeHtml(coverNote)}</div>`
          : ''
      }
    </div>
    <div class="footer">
      Dossier transmis depuis le module recrutement du site web ERGR Zaccar.<br>
      Pour répondre directement au candidat, cliquez sur Répondre (Reply-To : ${escapeHtml(email)}).
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
      const sanitizedName = String(fullName).replace(/["\r\n]/g, '').trim()
      const sanitizedEmail = String(email).replace(/[\r\n]/g, '').trim()
      await transporter.sendMail({
        from: `"ERGR Zaccar Recrutement" <${process.env.SMTP_USER.trim()}>`,
        to: RECIPIENT_EMAIL,
        replyTo: `"${sanitizedName}" <${sanitizedEmail}>`,
        subject: `[ERGR Recrutement] ${reference} — ${sanitizedName} (${readableEducation})`,
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

// ============================================================================
// ENDPOINT 3: POST /api/alerts/subscribe (Inscription aux Alertes Officielles)
// ============================================================================
app.post('/api/alerts/subscribe', subscribeRateLimiter, async (req, res) => {
  try {
    const { email, organizationName, tenders, careers, language = 'fr' } = req.body

    // Validation
    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({
        success: false,
        error: 'Une adresse e-mail valide est requise.',
      })
    }

    const wantsTenders = Boolean(tenders)
    const wantsCareers = Boolean(careers)

    if (!wantsTenders && !wantsCareers) {
      return res.status(400).json({
        success: false,
        error: 'Veuillez sélectionner au moins une catégorie d’alerte (Appels d’offres ou Recrutements).',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const subscribers = getSubscribers()
    let subscriber = subscribers.find((s) => s.email === normalizedEmail)
    const isNew = !subscriber
    const token = subscriber?.token || crypto.randomUUID()
    const now = new Date().toISOString()

    if (isNew) {
      subscriber = {
        id: `SUB-${Date.now()}`,
        email: normalizedEmail,
        organizationName: (organizationName || '').trim(),
        tenders: wantsTenders,
        careers: wantsCareers,
        language: language === 'ar' ? 'ar' : 'fr',
        token,
        active: true,
        createdAt: now,
        updatedAt: now,
      }
      subscribers.push(subscriber)
    } else {
      subscriber.organizationName = (organizationName || subscriber.organizationName || '').trim()
      subscriber.tenders = wantsTenders
      subscriber.careers = wantsCareers
      subscriber.language = language === 'ar' ? 'ar' : 'fr'
      subscriber.active = true
      subscriber.updatedAt = now
    }

    saveSubscribers(subscribers)
    console.log(`[ERGR-ALERTES] 🔔 ${isNew ? 'Nouvel abonné' : 'Mise à jour'} : ${normalizedEmail} (Marchés: ${wantsTenders ? 'OUI' : 'NON'}, Emploi: ${wantsCareers ? 'OUI' : 'NON'})`)

    // Envoi de l'e-mail de confirmation officiel
    const transporter = getTransporter()
    const baseUrl = getAppBaseUrl(req)
    const unsubscribeUrl = `${baseUrl}/api/alerts/unsubscribe?token=${encodeURIComponent(token)}`

    const isAr = subscriber.language === 'ar'
    const subject = isAr
      ? 'تأكيد اشتراككم في الإشعارات الرسمية — م.ه.ر.ع زكار'
      : 'Confirmation de votre abonnement aux alertes officielles — ERGR Zaccar'

    const htmlContent = `
<!DOCTYPE html>
<html lang="${isAr ? 'ar' : 'fr'}" dir="${isAr ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f5; margin: 0; padding: 20px 10px; color: #1c2e24; -webkit-text-size-adjust: 100%; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #d5ded9; box-shadow: 0 4px 14px rgba(0,0,0,0.06); padding: 20px 22px; box-sizing: border-box; }
    .greeting { font-size: 16px; font-weight: 700; margin-bottom: 12px; }
    .box { background: #f0f7f4; border: 1px solid #d2e5dd; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .topic-item { display: flex; align-items: center; gap: 8px; margin: 8px 0; font-size: 14px; font-weight: 600; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; background: #006233; color: #ffffff; }
    .law-note { font-size: 11px; color: #5a7566; line-height: 1.5; margin-top: 24px; padding-top: 16px; border-top: 1px solid #edf2ef; }
    .footer { background: #fbfdfc; padding: 18px 24px; text-align: center; font-size: 12px; color: #738a7c; border-top: 1px solid #edf2ef; margin: 20px -22px -20px; }
    .unsub-btn { display: inline-block; margin-top: 12px; font-size: 11px; color: #b91c1c; text-decoration: underline; }

    @media only screen and (min-width: 540px) {
      .official-header-logo-td { width: 75px !important; padding: 8px 6px !important; }
      .official-header-logo-img { width: 58px !important; }
      .official-header-text-td { padding: 8px 10px !important; }
      .hdr-txt-ar-ggr { font-size: 13px !important; }
      .hdr-txt-fr-ggr { font-size: 11px !important; }
      .hdr-txt-ar-ergr { font-size: 14px !important; }
      .hdr-txt-fr-ergr { font-size: 11.5px !important; }
      .hdr-txt-capital { font-size: 9px !important; }
    }

    @media only screen and (max-width: 480px) {
      body { padding: 6px 4px !important; }
      .container { padding: 12px 10px !important; margin: 4px auto !important; border-radius: 6px !important; }
      .official-header-logo-td { width: 52px !important; min-width: 48px !important; max-width: 55px !important; padding: 4px 2px !important; }
      .official-header-logo-img { width: 40px !important; }
      .official-header-text-td { padding: 4px 4px !important; }
      .hdr-txt-ar-ggr { font-size: 10px !important; }
      .hdr-txt-fr-ggr { font-size: 8px !important; letter-spacing: 0.1px !important; }
      .hdr-txt-ar-ergr { font-size: 11px !important; }
      .hdr-txt-fr-ergr { font-size: 8.5px !important; }
      .hdr-txt-capital { font-size: 7px !important; letter-spacing: 0px !important; }
      .greeting { font-size: 14px !important; }
      .footer { margin: 16px -10px -12px !important; padding: 12px 10px !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    ${getOfficialEmailHeaderHtml()}
    <div class="content">
      <div class="greeting">${isAr ? 'مرحباً بكم،' : 'Madame, Monsieur,'}</div>
      <p style="font-size: 14px; line-height: 1.6;">
        ${isAr
          ? 'تم تأكيد تسجيلكم بنجاح في نظام الإشعارات والتنبيهات الرسمية لـ <strong>المؤسسة الجهوية للهندسة الريفية زكار</strong>. ستصلكم إعلاناتنا فور نشرها تكريساً لمبدأ الشفافية وتكافؤ الفرص.'
          : 'Votre inscription aux alertes officielles de l’<strong>Entreprise Régionale de Génie Rural Zaccar</strong> a bien été confirmée. Vous serez désormais informé en priorité de nos publications institutionnelles.'}
      </p>

      <div class="box">
        <div style="font-size: 13px; font-weight: 700; margin-bottom: 8px; color: #0e3b2e;">
          ${isAr ? 'مجالات الإشعارات المفعلة لبريدكم :' : 'Vos préférences d’alerte sélectionnées :'}
        </div>
        ${wantsTenders ? `<div class="topic-item">✅ <span>${isAr ? 'إعلانات الصفقات العمومية وطلبات العروض (AON)' : 'Appels d’offres, consultations et marchés publics'}</span></div>` : ''}
        ${wantsCareers ? `<div class="topic-item">✅ <span>${isAr ? 'إعلانات التوظيف ومسابقات الالتحاق' : 'Concours et avis de recrutement'}</span></div>` : ''}
      </div>

      <p class="law-note">
        ${isAr
          ? 'طبقا للقانون رقم 18-07 المؤرخ في 10 جوان 2018 المتعلق بحماية الأشخاص الطبيعيين في مجال معالجة المعطيات ذات الطابع الشخصي، تبقى بياناتكم سرية ولا يتم مشاركتها أبداً.'
          : 'Conformément à la loi n° 18-07 du 10 juin 2018 relative à la protection des personnes physiques dans le traitement des données à caractère personnel, votre adresse e-mail demeure strictement confidentielle et sécurisée.'}
      </p>
    </div>
    <div class="footer">
      <div>© ${new Date().getFullYear()} ERGR Zaccar — EPE/SPA Algérie</div>
      <div>Route Nationale N° 4, BP 45, Rouiba, Alger</div>
      <a href="${unsubscribeUrl}" class="unsub-btn">${isAr ? 'إلغاء الاشتراك من التنبيهات بنقرة واحدة' : 'Se désinscrire des alertes en 1 clic'}</a>
    </div>
  </div>
</body>
</html>
`

    if (transporter) {
      await transporter.sendMail({
        from: `"ERGR Zaccar Alertes" <${process.env.SMTP_USER.trim()}>`,
        to: normalizedEmail,
        subject,
        html: htmlContent,
        attachments: getEmailLogoAttachments(),
      })
      console.log(`[ERGR-ALERTES] ✉️ E-mail de confirmation expédié vers ${normalizedEmail}`)
    }

    return res.status(200).json({
      success: true,
      message: isAr
        ? 'تم تسجيل وتأكيد اشتراككم بنجاح.'
        : 'Votre abonnement aux alertes a été enregistré et confirmé avec succès.',
      subscriber: {
        email: normalizedEmail,
        organizationName: subscriber.organizationName,
        tenders: subscriber.tenders,
        careers: subscriber.careers,
      },
    })
  } catch (error) {
    console.error('[ERGR-ALERTES] ❌ Erreur lors de l’abonnement :', error)
    return res.status(500).json({
      success: false,
      error: 'Une erreur technique est survenue lors de l’enregistrement.',
    })
  }
})

// ============================================================================
// ENDPOINT 4: GET & POST /api/alerts/unsubscribe (Désinscription)
// ============================================================================
app.get('/api/alerts/unsubscribe', (req, res) => {
  const { token } = req.query
  if (!token) {
    return res.status(400).send('Jeton de désinscription manquant.')
  }

  const subscribers = getSubscribers()
  const subscriber = subscribers.find((s) => s.token === token)

  if (!subscriber) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Lien invalide</title></head>
      <body style="font-family:sans-serif; text-align:center; padding:50px;">
        <h2>Lien de désinscription invalide ou expiré</h2>
        <p>Ce lien ne correspond à aucun abonnement actif.</p>
        <a href="/" style="color:#006233; font-weight:bold;">Retourner sur le site de l'ERGR Zaccar</a>
      </body>
      </html>
    `)
  }

  subscriber.active = false
  subscriber.unsubscribedAt = new Date().toISOString()
  saveSubscribers(subscribers)
  console.log(`[ERGR-ALERTES] 🛑 Désinscription effectuée pour : ${subscriber.email}`)

  const isAr = subscriber.language === 'ar'
  return res.status(200).send(`
    <!DOCTYPE html>
    <html lang="${isAr ? 'ar' : 'fr'}" dir="${isAr ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="utf-8">
      <title>${isAr ? 'تأكيد إلغاء الاشتراك' : 'Désinscription confirmée'}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#f4f6f5; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; }
        .card { background:#fff; padding:40px; border-radius:12px; max-width:500px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.08); border:1px solid #e1e7e4; }
        .icon { font-size:48px; margin-bottom:16px; }
        h1 { font-size:22px; color:#0e3b2e; margin:0 0 12px; }
        p { color:#5a7566; font-size:15px; line-height:1.5; margin-bottom:24px; }
        .btn { display:inline-block; background:#006233; color:#fff; text-decoration:none; padding:12px 24px; border-radius:8px; font-weight:700; font-size:14px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon">✅</div>
        <h1>${isAr ? 'تم إلغاء الاشتراك بنجاح' : 'Désinscription confirmée'}</h1>
        <p>${isAr ? 'تم إيقاف إرسال الإشعارات إلى بريدكم. يمكنكم إعادة الاشتراك في أي وقت عبر بوابتنا الرسمية.' : 'Votre adresse e-mail a bien été retirée de notre liste de diffusion. Vous ne recevrez plus d’alertes de notre part.'}</p>
        <a href="/" class="btn">${isAr ? 'العودة إلى البوابة الرسمية' : 'Retourner au portail officiel'}</a>
      </div>
    </body>
    </html>
  `)
})

app.post('/api/alerts/unsubscribe', (req, res) => {
  const { token, email } = req.body
  const subscribers = getSubscribers()
  const subscriber = subscribers.find((s) => (token && s.token === token) || (email && s.email === email.trim().toLowerCase()))

  if (!subscriber) {
    return res.status(404).json({ success: false, error: 'Abonné introuvable.' })
  }

  subscriber.active = false
  subscriber.unsubscribedAt = new Date().toISOString()
  saveSubscribers(subscribers)
  return res.status(200).json({ success: true, message: 'Désinscription effectuée avec succès.' })
})

// ============================================================================
// ENDPOINT 5: GET /api/alerts/stats (Monitoring interne protégé)
// ============================================================================
app.get('/api/alerts/stats', verifyAdminKey, (_req, res) => {
  const subscribers = getSubscribers()
  const active = subscribers.filter((s) => s.active)
  return res.status(200).json({
    total: subscribers.length,
    activeCount: active.length,
    tendersSubscribers: active.filter((s) => s.tenders).length,
    careersSubscribers: active.filter((s) => s.careers).length,
  })
})

// ============================================================================
// ENDPOINT 6: POST /api/alerts/broadcast (Diffusion officielle protégée)
// ============================================================================
app.post('/api/alerts/broadcast', verifyAdminKey, async (req, res) => {
  try {
    const {
      type = 'tenders', // 'tenders' | 'careers'
      title,
      reference,
      summary,
      deadline,
      link = 'https://ergr-zaccar.dz/appels-offres',
      qualification,
    } = req.body

    if (!title || !reference) {
      return res.status(400).json({
        success: false,
        error: 'Le titre et la référence de l’avis sont obligatoires.',
      })
    }

    const subscribers = getSubscribers()
    const targetSubscribers = subscribers.filter((s) => s.active && s[type])

    if (targetSubscribers.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Aucun abonné actif pour cette catégorie.',
        count: 0,
      })
    }

    const transporter = getTransporter()
    const origin = getAppBaseUrl(req)
    const results = []

    for (const sub of targetSubscribers) {
      const isAr = sub.language === 'ar'
      const unsubscribeUrl = `${origin}/api/alerts/unsubscribe?token=${encodeURIComponent(sub.token)}`
      const isTender = type === 'tenders'

      const badgeText = isTender
        ? (isAr ? 'إشعار بمناقصة جديدة' : 'NOUVEL AVIS D’APPEL D’OFFRES')
        : (isAr ? 'إعلان توظيف جديد' : 'NOUVEL AVIS DE RECRUTEMENT')

      const sanitizedRef = String(reference).replace(/[\r\n]/g, '').trim()
      const sanitizedTitle = String(title).replace(/[\r\n]/g, '').trim()
      const subject = isTender
        ? `[ERGR Zaccar - Alerte Marché] ${sanitizedRef} : ${sanitizedTitle}`
        : `[ERGR Zaccar - Alerte Recrutement] ${sanitizedRef} : ${sanitizedTitle}`

      const html = `<!DOCTYPE html>
<html lang="${isAr ? 'ar' : 'fr'}" dir="${isAr ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin:0; padding:16px 10px; background:#f4f6f5; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-text-size-adjust: 100%; }
    .wrapper { max-width:620px; margin:16px auto; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #d5ded9; box-shadow:0 4px 14px rgba(0,0,0,0.06); padding:20px 22px; box-sizing: border-box; }
    .body { color:#1d2522; line-height:1.6; }
    .alert-badge { display:inline-block; background:#e6f4ea; color:#006233; font-weight:800; font-size:12px; padding:6px 14px; border-radius:999px; border:1px solid #c2e2cc; margin-bottom:16px; text-transform:uppercase; }
    .tender-title { font-size:20px; font-weight:800; color:#071e16; margin:0 0 8px; }
    .tender-ref { font-size:14px; font-weight:700; color:#006233; margin-bottom:18px; }
    .details-card { background:#f9fbfa; border:1px solid #e1e8e4; border-radius:8px; padding:18px; margin:20px 0; }
    .detail-row { margin-bottom:10px; font-size:14px; }
    .detail-row:last-child { margin-bottom:0; }
    .detail-label { font-weight:700; color:#4c5a53; }
    .detail-val { color:#1d2522; }
    .cta-btn { display:inline-block; background:#006233; color:#ffffff !important; text-decoration:none; padding:14px 28px; border-radius:8px; font-weight:800; font-size:15px; margin:20px 0; text-align:center; }
    .law-note { font-size:12px; color:#6d7972; border-top:1px solid #e5ece8; padding-top:16px; margin-top:24px; line-height:1.5; }
    .footer { background:#edf2ef; padding:18px 24px; text-align:center; font-size:12px; color:#5a6860; margin:20px -22px -20px; border-top:1px solid #e5ece8; }
    .unsub-link { color:#8b0000; text-decoration:underline; font-weight:600; }

    @media only screen and (min-width: 540px) {
      .official-header-logo-td { width: 75px !important; padding: 8px 6px !important; }
      .official-header-logo-img { width: 58px !important; }
      .official-header-text-td { padding: 8px 10px !important; }
      .hdr-txt-ar-ggr { font-size: 13px !important; }
      .hdr-txt-fr-ggr { font-size: 11px !important; }
      .hdr-txt-ar-ergr { font-size: 14px !important; }
      .hdr-txt-fr-ergr { font-size: 11.5px !important; }
      .hdr-txt-capital { font-size: 9px !important; }
    }

    @media only screen and (max-width: 480px) {
      body { padding: 6px 4px !important; }
      .wrapper { padding: 12px 10px !important; margin: 4px auto !important; border-radius: 6px !important; }
      .official-header-logo-td { width: 52px !important; min-width: 48px !important; max-width: 55px !important; padding: 4px 2px !important; }
      .official-header-logo-img { width: 40px !important; }
      .official-header-text-td { padding: 4px 4px !important; }
      .hdr-txt-ar-ggr { font-size: 10px !important; }
      .hdr-txt-fr-ggr { font-size: 8px !important; letter-spacing: 0.1px !important; }
      .hdr-txt-ar-ergr { font-size: 11px !important; }
      .hdr-txt-fr-ergr { font-size: 8.5px !important; }
      .hdr-txt-capital { font-size: 7px !important; letter-spacing: 0px !important; }
      .tender-title { font-size: 16px !important; }
      .cta-btn { width: 100% !important; box-sizing: border-box !important; padding: 12px 16px !important; font-size: 14px !important; }
      .footer { margin: 16px -10px -12px !important; padding: 12px 10px !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    ${getOfficialEmailHeaderHtml()}
    <div class="body">
      <div class="alert-badge">${escapeHtml(badgeText)}</div>
      <h1 class="tender-title">${escapeHtml(title)}</h1>
      <div class="tender-ref">${isAr ? 'المرجع الرسمي :' : 'Référence officielle :'} <strong>${escapeHtml(reference)}</strong></div>
      
      <p>${isAr ? 'نعلمكم بنشر الإشعار التالي عبر بوابتنا الرسمية للشفافية والصفقات العمومية :' : 'Nous vous informons de la publication officielle de l’avis suivant sur notre portail institutionnel :'}</p>

      <div class="details-card">
        <div class="detail-row">
          <span class="detail-label">${isAr ? 'الموضوع والوصف :' : 'Objet / Synthèse :'}</span>
          <span class="detail-val">${escapeHtml(summary || 'Travaux et prestations d’aménagement forestier et génie rural.')}</span>
        </div>
        ${qualification ? `
        <div class="detail-row">
          <span class="detail-label">${isAr ? 'المؤهلات المطلوبة :' : 'Qualification requise :'}</span>
          <span class="detail-val">${escapeHtml(qualification)}</span>
        </div>` : ''}
        ${deadline ? `
        <div class="detail-row">
          <span class="detail-label">${isAr ? 'تاريخ وساعة الإيداع الأخيرة :' : 'Date limite de dépôt :'}</span>
          <span class="detail-val" style="font-weight:700; color:#b91c1c;">${escapeHtml(deadline)}</span>
        </div>` : ''}
      </div>

      <div style="text-align:center;">
        <a href="${escapeHtml(link)}" class="cta-btn">${isAr ? 'الاطلاع على دفتر الشروط والتفاصيل' : 'Consulter le dossier & le cahier des charges'}</a>
      </div>

      <div class="law-note">
        ${isAr 
          ? 'تلقيتم هذا البريد بصفتكم مشتركين في نظام التنبيهات لمؤسسة زكار. طبقا لأحكام القانون رقم 18-07، تظل بياناتكم سرية ومحمية.'
          : 'Vous recevez ce courriel car vous êtes inscrit au service de veille et d’alerte de l’ERGR Zaccar. Conformément à la loi n° 18-07, vos données demeurent strictement confidentielles.'}
      </div>
    </div>
    <div class="footer">
      <div>© ${new Date().getFullYear()} ERGR Zaccar — Groupe Génie Rural (GGR)</div>
      <div style="margin-top:8px;">
        <a href="${escapeHtml(unsubscribeUrl)}" class="unsub-link">${isAr ? 'إلغاء الاشتراك من التنبيهات بنقرة واحدة' : 'Se désinscrire de ces alertes en 1 clic'}</a>
      </div>
    </div>
  </div>
</body>
</html>`

      if (transporter) {
        await transporter.sendMail({
          from: `"ERGR Zaccar Alertes" <${process.env.SMTP_USER.trim()}>`,
          to: sub.email,
          subject,
          html,
          attachments: getEmailLogoAttachments(),
        })
        console.log(`[ERGR-ALERTES] 📢 Alerte diffusée avec succès vers ${sub.email}`)
      }
      results.push(sub.email)
    }

    return res.status(200).json({
      success: true,
      message: `Alerte diffusée à ${results.length} abonné(s).`,
      count: results.length,
      recipients: results,
    })
  } catch (err) {
    console.error('[ERGR-ALERTES] ❌ Erreur lors de la diffusion :', err)
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la diffusion de l’alerte.',
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
  console.log(` • Alertes E-mail : POST http://localhost:${PORT}/api/alerts/subscribe`)
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
