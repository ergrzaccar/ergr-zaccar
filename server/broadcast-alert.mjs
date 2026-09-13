/**
 * Script d'administration — Diffusion d'alerte officielle par e-mail
 * Utilisation :
 *   node server/broadcast-alert.mjs --type=tenders --ref="AON n° 05/ERGR-Z/2026" --title="Travaux de reboisement et aménagement"
 */
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const PORT = process.env.PORT || 5000

// Parse CLI arguments
const args = process.argv.slice(2)
const params = {}
for (const arg of args) {
  const match = arg.match(/^--([^=]+)=(.*)$/)
  if (match) {
    params[match[1]] = match[2]
  }
}

const payload = {
  type: params.type || 'tenders',
  reference: params.ref || params.reference || 'AON n° 05/ERGR-Z/2026',
  title: params.title || 'Avis d’Appel d’Offres National Ouvert — Aménagement Forestier & Reboisement',
  summary: params.summary || 'Réalisation de travaux de reboisement, gabions et ouverture de pistes forestières dans le cadre du projet Barrage Vert.',
  deadline: params.deadline || '28 Avril 2026 à 12h00',
  qualification: params.qualification || 'Qualification professionnelle Travaux Forestiers / BTPH Catégorie III ou plus',
  link: params.link || 'http://localhost:5173/appels-offres',
}

console.log(`\n📢 [ERGR Zaccar] Lancement de la diffusion de l'alerte...`)
console.log(` • Catégorie  : ${payload.type}`)
console.log(` • Référence  : ${payload.reference}`)
console.log(` • Titre      : ${payload.title}`)
console.log(` • Échéance   : ${payload.deadline}\n`)

try {
  const res = await fetch(`http://localhost:${PORT}/api/alerts/broadcast`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json()
  if (data.success) {
    console.log(`✅ ${data.message}`)
    if (data.recipients && data.recipients.length > 0) {
      console.log(`📧 Destinataires notifiés :`)
      data.recipients.forEach((email) => console.log(`   - ${email}`))
    }
  } else {
    console.error(`❌ Erreur :`, data.error)
  }
} catch (err) {
  console.error(`❌ Erreur technique :`, err.message)
}
console.log(``)
