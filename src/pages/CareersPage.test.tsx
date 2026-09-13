import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { CareersPage } from './CareersPage'

function renderCareersPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <CareersPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('CareersPage', () => {
  it('renders the hero section with proof badges, stats and spotlight card', () => {
    renderCareersPage()

    // Hero title
    expect(
      screen.getByRole('heading', {
        name: /Rejoignez l’ERGR Zaccar : construisons ensemble le génie rural algérien/i,
      }),
    ).toBeInTheDocument()

    // Proof badges
    expect(screen.getByText(/1 200\+ agents et techniciens/i)).toBeInTheDocument()
    expect(screen.getByText(/Présence sur 8 wilayas d’intervention/i)).toBeInTheDocument()
    expect(screen.getByText(/Plan de formation continue qualifiant/i)).toBeInTheDocument()
    expect(screen.getByText(/Sécurité HSE & équipements certifiés/i)).toBeInTheDocument()

    // Stats
    expect(screen.getByText('1 200+')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('45+')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()

    // Spotlight card
    expect(
      screen.getByRole('heading', {
        name: /Des métiers de sens au service de la nation/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the HR values and commitments section', () => {
    renderCareersPage()

    expect(
      screen.getByRole('heading', {
        name: /Pourquoi bâtir votre parcours professionnel à l’ERGR Zaccar \?/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText(/Santé, Sécurité au Travail & HSE/i)).toBeInTheDocument()
    expect(screen.getByText(/Promotion Interne & Reconnaissance du Mérite/i)).toBeInTheDocument()
    expect(screen.getByText(/Transmission & Savoir-Faire Pépiniériste/i)).toBeInTheDocument()
    expect(screen.getByText(/Ancrage Territorial & Recrutement Local/i)).toBeInTheDocument()
  })

  it('renders the jobs catalog with active job offers', () => {
    renderCareersPage()

    // Section title
    expect(
      screen.getByRole('heading', {
        name: /Toutes les opportunités d’emploi ouvertes/i,
      }),
    ).toBeInTheDocument()

    // Job references & titles
    expect(screen.getByText('REC-2026-01')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Ingénieur Agronome \/ Forestier - Spécialiste Reboisement & Barrage Vert/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('REC-2026-02')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Chef d’Atelier Régional & Maintenance des Engins Lourds de Travaux Publics/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('REC-2026-03')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Conducteurs d’Engins de Terrassement Lourd/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('REC-2026-04')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Responsable Technique de Pépinière Industrielle & Systèmes de Micro-Irrigation/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('REC-2026-05')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Expert Géomatique, SIG & Télédétection par Drones/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('REC-2026-06')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Cadre Juriste \/ Gestionnaire Spécialiste des Marchés Publics/i,
      }),
    ).toBeInTheDocument()
  })

  it('filters job offers by domain tab', () => {
    renderCareersPage()

    const heavyEquipTab = screen.getByRole('tab', { name: /Engins lourds & Mécanique/i })
    fireEvent.click(heavyEquipTab)

    expect(screen.getByText('REC-2026-02')).toBeInTheDocument()
    expect(screen.getByText('REC-2026-03')).toBeInTheDocument()
    expect(screen.queryByText('REC-2026-01')).not.toBeInTheDocument()
    expect(screen.queryByText('REC-2026-04')).not.toBeInTheDocument()
  })

  it('filters job offers by search query and resets cleanly', () => {
    renderCareersPage()

    const searchInput = screen.getByRole('searchbox')
    fireEvent.change(searchInput, { target: { value: 'Bulldozers' } })

    expect(screen.getByText('REC-2026-03')).toBeInTheDocument()
    expect(screen.queryByText('REC-2026-01')).not.toBeInTheDocument()
    expect(screen.queryByText('REC-2026-06')).not.toBeInTheDocument()

    // Reset filters
    const resetBtn = screen.getByRole('button', { name: /Réinitialiser les filtres/i })
    fireEvent.click(resetBtn)

    expect(screen.getByText('REC-2026-01')).toBeInTheDocument()
    expect(screen.getByText('REC-2026-06')).toBeInTheDocument()
  })

  it('opens and closes the job detail modal', () => {
    renderCareersPage()

    const viewButtons = screen.getAllByRole('button', { name: /Consulter la fiche de poste/i })
    expect(viewButtons.length).toBeGreaterThan(0)
    fireEvent.click(viewButtons[0])

    // Dialog is visible
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
    expect(screen.getByText(/Fiche de Poste Officielle/i)).toBeInTheDocument()
    expect(screen.getByText(/Missions Principales & Responsabilités/i)).toBeInTheDocument()
    expect(screen.getByText(/Profil Recherché & Compétences Clés/i)).toBeInTheDocument()
    expect(screen.getByText(/Constitution Obligatoire du Dossier de Candidature/i)).toBeInTheDocument()

    // Close dialog
    const closeButtons = screen.getAllByRole('button', { name: /Fermer la fiche/i })
    expect(closeButtons.length).toBeGreaterThan(0)
    fireEvent.click(closeButtons[0])

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the internships and university conventions section', () => {
    renderCareersPage()

    expect(
      screen.getByRole('heading', {
        name: /Stages de Fin d’Études \(PFE\) & Conventions Universitaires/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText(/ENSA El Harrach/i)).toBeInTheDocument()
    expect(screen.getByText(/Stage PFE - Ingénieur d’État en Agronomie \/ Foresterie/i)).toBeInTheDocument()
    expect(screen.getByText(/Stage PFE - Master Géomatique & Télédétection Forestière/i)).toBeInTheDocument()
    expect(screen.getByText(/Stage Professionnel - Technicien Supérieur Pépiniériste/i)).toBeInTheDocument()
  })

  it('validates the online application form and handles successful submission', async () => {
    renderCareersPage()

    // Attempt to submit empty form
    const submitBtn = screen.getByRole('button', { name: /Soumettre ma candidature/i })
    fireEvent.click(submitBtn)

    // Validation errors should appear
    expect(
      screen.getByText(/Veuillez renseigner votre nom complet/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Veuillez renseigner une adresse email valide/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Veuillez renseigner un numéro de téléphone valide/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Veuillez sélectionner l’offre d’emploi à laquelle vous postulez/i),
    ).toBeInTheDocument()

    // Fill valid form fields
    const nameInput = screen.getByLabelText(/Nom et prénom/i)
    fireEvent.change(nameInput, { target: { value: 'Karim Hadjout' } })

    const emailInput = screen.getByLabelText(/Adresse email/i)
    fireEvent.change(emailInput, { target: { value: 'k.hadjout@example.dz' } })

    const phoneInput = screen.getByLabelText(/Numéro de téléphone portable/i)
    fireEvent.change(phoneInput, { target: { value: '0555123456' } })

    const offerSelect = screen.getByLabelText(/Sélectionnez l’offre d’emploi concernée/i)
    fireEvent.change(offerSelect, { target: { value: 'ing-agronome-barrage-vert-2026' } })

    // Simulate file upload (CV PDF)
    const file = new File(['dummy-cv-content'], 'Karim_Hadjout_CV.pdf', {
      type: 'application/pdf',
    })
    const fileInput = document.getElementById('careers-resume-upload') as HTMLInputElement
    expect(fileInput).toBeInTheDocument()
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Check consent checkbox
    const consentCheckbox = screen.getByRole('checkbox')
    fireEvent.click(consentCheckbox)

    // Resubmit
    fireEvent.click(submitBtn)

    // Expect success card with generated registration code
    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', {
            name: /Candidature enregistrée avec succès !/i,
          }),
        ).toBeInTheDocument()
      },
      { timeout: 2000 },
    )

    expect(screen.getByText(/CAND-2026-/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Déposer une autre candidature/i }),
    ).toBeInTheDocument()
  })

  it('renders the DRH contact section with official coordinates', () => {
    renderCareersPage()

    expect(
      screen.getByRole('heading', {
        name: /Une question relative à nos recrutements ou à nos carrières \?/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getAllByText(/recrutement@ergr-zaccar\.dz/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/\+213 \(0\) 23 85 41 20/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Poste RH 118/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Haouch Rouiba, BP 34, Rouiba 16012, Alger/i)).toBeInTheDocument()
  })
})
