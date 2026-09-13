import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { TendersPage } from './TendersPage'

function renderTendersPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <TendersPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('TendersPage', () => {
  it('renders the hero section with regulatory proof badges and dossier card', () => {
    renderTendersPage()

    // Hero title
    expect(
      screen.getByRole('heading', {
        name: /Avis d’appels d’offres, consultations & attributions/i,
      }),
    ).toBeInTheDocument()

    // Proof badges
    expect(screen.getAllByText(/Conforme au Décret présidentiel n° 15-247/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Bureau des Marchés - Siège de Rouiba/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Publication au BOMOP & Presse nationale/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Séances publiques d’ouverture des plis/i).length).toBeGreaterThan(0)

    // Hero dossier card & media
    expect(
      screen.getByRole('heading', {
        name: /Cadre réglementaire rigoureux et traçabilité/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByAltText(/ERGR Zaccar Bureau des Marchés & Administration/i),
    ).toBeInTheDocument()
  })

  it('renders the registry with active tenders and allows status filtering', () => {
    renderTendersPage()

    // Main section heading
    expect(
      screen.getByRole('heading', {
        name: /Avis de marchés publics & consultations/i,
      }),
    ).toBeInTheDocument()

    // All 6 tenders should be present initially
    expect(screen.getByText('AON n° 04/ERGR-Z/2026')).toBeInTheDocument()
    expect(screen.getByText('AON n° 03/ERGR-Z/2026')).toBeInTheDocument()
    expect(screen.getByText('Consultation n° 08/DP/2026')).toBeInTheDocument()
    expect(screen.getByText('AON n° 02/ERGR-Z/2026')).toBeInTheDocument()
    expect(screen.getByText('Attribution n° 01/ERGR-Z/2026')).toBeInTheDocument()
    expect(screen.getByText('Infructuosité n° 09/ERGR-Z/2025')).toBeInTheDocument()

    // Filter by "Attribués"
    const awardedTab = screen.getByRole('tab', { name: /Attribués/i })
    fireEvent.click(awardedTab)

    expect(screen.getByText('Attribution n° 01/ERGR-Z/2026')).toBeInTheDocument()
    expect(screen.getByText('SARL Hydraulique & Arrosage Moderne')).toBeInTheDocument()
    expect(screen.queryByText('AON n° 04/ERGR-Z/2026')).not.toBeInTheDocument()
    expect(screen.queryByText('Infructuosité n° 09/ERGR-Z/2025')).not.toBeInTheDocument()

    // Filter by "Infructueux / Annulés"
    const cancelledTab = screen.getByRole('tab', { name: /Infructueux \/ Annulés/i })
    fireEvent.click(cancelledTab)

    expect(screen.getByText('Infructuosité n° 09/ERGR-Z/2025')).toBeInTheDocument()
    expect(screen.queryByText('Attribution n° 01/ERGR-Z/2026')).not.toBeInTheDocument()
  })

  it('filters tenders by search query and resets filters cleanly', () => {
    renderTendersPage()

    const searchInput = screen.getByRole('searchbox')
    fireEvent.change(searchInput, { target: { value: 'gabions' } })

    expect(screen.getByText('AON n° 04/ERGR-Z/2026')).toBeInTheDocument()
    expect(screen.queryByText('AON n° 03/ERGR-Z/2026')).not.toBeInTheDocument()

    // Click reset button
    const resetBtn = screen.getByRole('button', { name: /Réinitialiser les filtres/i })
    fireEvent.click(resetBtn)

    // All items return
    expect(screen.getByText('AON n° 04/ERGR-Z/2026')).toBeInTheDocument()
    expect(screen.getByText('AON n° 03/ERGR-Z/2026')).toBeInTheDocument()
    expect(screen.getByText('Consultation n° 08/DP/2026')).toBeInTheDocument()
  })

  it('opens and closes the technical detail modal with 3-envelope specs', () => {
    renderTendersPage()

    // Find and click the first "Consulter l'avis & CDC" button
    const viewButtons = screen.getAllByRole('button', { name: /Consulter l’avis & CDC/i })
    expect(viewButtons.length).toBeGreaterThan(0)
    fireEvent.click(viewButtons[0])

    // Modal dialog is displayed
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
    expect(screen.getByText(/Fiche technique de l’avis de marché/i)).toBeInTheDocument()
    expect(screen.getByText(/Composition des trois plis cachetés :/i)).toBeInTheDocument()
    expect(screen.getByText(/1\. Dossier de candidature/i)).toBeInTheDocument()
    expect(screen.getByText(/2\. Offre technique/i)).toBeInTheDocument()
    expect(screen.getByText(/3\. Offre financière/i)).toBeInTheDocument()
    expect(screen.getByText(/Caution de soumission :/i)).toBeInTheDocument()

    // Close modal via close button
    const closeButtons = screen.getAllByRole('button', { name: /Fermer la fiche/i })
    expect(closeButtons.length).toBeGreaterThanOrEqual(1)
    fireEvent.click(closeButtons[0])

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the 4-step procurement guide and Bureau des Marchés CTA', () => {
    renderTendersPage()

    // Guide section
    expect(
      screen.getByRole('heading', {
        name: /Guide du soumissionnaire aux marchés publics/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Retrait du Cahier des Charges \(CDC\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Préparation rigoureuse des 3 plis cachetés/i)).toBeInTheDocument()
    expect(screen.getByText(/Dépôt au Bureau des Marchés/i)).toBeInTheDocument()
    expect(screen.getByText(/Séance publique d’ouverture des plis/i)).toBeInTheDocument()

    // CTA section
    expect(
      screen.getByRole('heading', {
        name: /Une question sur un cahier des charges ou une procédure \?/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/marches@ergr-zaccar\.dz/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/\+213 \(0\) 23 85 41 20/i).length).toBeGreaterThan(0)
  })
})
