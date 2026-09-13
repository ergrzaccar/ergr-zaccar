import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { ProjectsPage } from './ProjectsPage'

function renderProjectsPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('ProjectsPage', () => {
  it('renders the hero, catalog section, project cards, and global impact metrics', () => {
    renderProjectsPage()

    // Hero title & proof badges
    expect(
      screen.getByRole('heading', {
        name: /Nos réalisations au cœur du territoire algérien/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/> 3,5 M de plants mis en terre/i)).toBeInTheDocument()
    expect(screen.getByText(/> 450 km de pistes ouvertes/i)).toBeInTheDocument()

    // Catalog header
    expect(
      screen.getByRole('heading', {
        name: /Catalogue des chantiers & interventions/i,
      }),
    ).toBeInTheDocument()

    // Project cards
    expect(
      screen.getByText(/Programme Barrage Vert & Reboisement Pastoral du Sud Médéa/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Désenclavement & Ouverture de Pistes Rurales dans le Massif du Zaccar/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Correction Torrentielle & Protection des Bassins Versants de l’Oued Chélif/i),
    ).toBeInTheDocument()

    // Impact section
    expect(
      screen.getByRole('heading', {
        name: /Des réalisations quantifiables au service du développement durable/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Ouvrages de gabionnage/i)).toBeInTheDocument()
    expect(screen.getByText(/Wilayas d’intervention/i)).toBeInTheDocument()
  })

  it('filters projects by category tab', () => {
    renderProjectsPage()

    // Initially both reforestation and tracks projects are shown
    expect(
      screen.getByText(/Programme Barrage Vert & Reboisement Pastoral du Sud Médéa/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Désenclavement & Ouverture de Pistes Rurales dans le Massif du Zaccar/i),
    ).toBeInTheDocument()

    // Click on Pistes & Désenclavement tab
    const tracksTab = screen.getByRole('tab', { name: /Pistes & Désenclavement/i })
    fireEvent.click(tracksTab)

    expect(
      screen.getByText(/Désenclavement & Ouverture de Pistes Rurales dans le Massif du Zaccar/i),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Programme Barrage Vert & Reboisement Pastoral du Sud Médéa/i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/Correction Torrentielle & Protection des Bassins Versants de l’Oued Chélif/i),
    ).not.toBeInTheDocument()

    // Click on Reboisement tab
    const reforestationTab = screen.getByRole('tab', { name: /Reboisement & Barrage Vert/i })
    fireEvent.click(reforestationTab)

    expect(
      screen.getByText(/Programme Barrage Vert & Reboisement Pastoral du Sud Médéa/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Réhabilitation Forestière & Reboisement du Mont Chenoua/i),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Désenclavement & Ouverture de Pistes Rurales dans le Massif du Zaccar/i),
    ).not.toBeInTheDocument()
  })

  it('filters projects by Wilaya select dropdown', () => {
    renderProjectsPage()

    const wilayaSelect = screen.getByLabelText(/Wilaya/i)
    fireEvent.change(wilayaSelect, { target: { value: 'ain-defla' } })

    expect(
      screen.getByText(/Désenclavement & Ouverture de Pistes Rurales dans le Massif du Zaccar/i),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Programme Barrage Vert & Reboisement Pastoral du Sud Médéa/i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/Correction Torrentielle & Protection des Bassins Versants de l’Oued Chélif/i),
    ).not.toBeInTheDocument()
  })

  it('filters projects by search input and resets', () => {
    renderProjectsPage()

    const searchInput = screen.getByPlaceholderText(/Rechercher un projet/i)
    fireEvent.change(searchInput, { target: { value: 'Chélif' } })

    expect(
      screen.getByText(/Correction Torrentielle & Protection des Bassins Versants de l’Oued Chélif/i),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Programme Barrage Vert & Reboisement Pastoral du Sud Médéa/i),
    ).not.toBeInTheDocument()

    // Click Reset
    const resetButton = screen.getByRole('button', { name: /Réinitialiser les filtres/i })
    fireEvent.click(resetButton)

    expect(
      screen.getByText(/Programme Barrage Vert & Reboisement Pastoral du Sud Médéa/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Correction Torrentielle & Protection des Bassins Versants de l’Oued Chélif/i),
    ).toBeInTheDocument()
  })

  it('opens and closes the project detail technical modal', () => {
    renderProjectsPage()

    // Find the first "Détails" button
    const detailButtons = screen.getAllByRole('button', { name: /Consulter le dossier/i })
    fireEvent.click(detailButtons[0])

    // Modal should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(/Fiche technique du chantier/i)).toBeInTheDocument()
    expect(screen.getByText(/Spécifications techniques du chantier/i)).toBeInTheDocument()
    expect(screen.getByText(/Délai d’exécution/i)).toBeInTheDocument()

    // Close the modal
    const closeBtn = screen.getByRole('button', { name: /Fermer la fiche/i })
    fireEvent.click(closeBtn)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
