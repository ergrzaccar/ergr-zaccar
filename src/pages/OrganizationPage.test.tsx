import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { OrganizationPage } from './OrganizationPage'

function renderOrganizationPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <OrganizationPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('OrganizationPage', () => {
  it('renders the hero, governance levels, and regional structure', () => {
    renderOrganizationPage()

    expect(
      screen.getByRole('heading', {
        name: /Une organisation territoriale structurée et réactive/i,
      }),
    ).toBeInTheDocument()

    // Governance levels
    expect(screen.getByText(/Trois niveaux structurels complémentaires/i)).toBeInTheDocument()
    expect(screen.getByText(/Niveau central et fonctionnel/i)).toBeInTheDocument()
    expect(screen.getByText(/Niveau opérationnel/i)).toBeInTheDocument()

    // Central entities
    expect(screen.getByText(/Pôles de compétences de la Direction Générale/i)).toBeInTheDocument()
    expect(screen.getByText('Direction Technique')).toBeInTheDocument()
    expect(screen.getByText('Direction des Pépinières')).toBeInTheDocument()

    // Regional directions
    expect(screen.getAllByText('Direction Régionale Bouira').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Direction Régionale Chlef').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Direction Régionale Médéa').length).toBeGreaterThanOrEqual(1)

    // Equipment parks
    expect(screen.getByText('Parc à matériel Bouira')).toBeInTheDocument()
    expect(screen.getByText('Parc à matériel Sidi Lakhdar')).toBeInTheDocument()
  })

  it('switches regional direction tabs', () => {
    renderOrganizationPage()

    // Click on Chlef tab
    const chlefTab = screen.getByRole('button', { name: 'Direction Régionale Chlef' })
    fireEvent.click(chlefTab)

    expect(
      screen.getByRole('heading', { name: 'Direction Régionale Chlef' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Direction Régionale Bouira' }),
    ).not.toBeInTheDocument()
  })
})
