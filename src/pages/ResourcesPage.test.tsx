import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { ResourcesPage } from './ResourcesPage'

function renderResourcesPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <ResourcesPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('ResourcesPage', () => {
  it('renders the hero, fleet inventory, human capital, maintenance, and emergency interventions', () => {
    renderResourcesPage()

    // Hero title and proof badges
    expect(
      screen.getByRole('heading', {
        name: /La puissance matérielle et humaine au service du territoire/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/497 engins & matériels recensés/i)).toBeInTheDocument()
    expect(screen.getByText(/4 parcs régionaux de maintenance/i)).toBeInTheDocument()
    expect(screen.getByText(/76 engins de terrassement lourd/i)).toBeInTheDocument()

    // Fleet inventory heading
    expect(screen.getByText(/Inventaire des 497 équipements de l’entreprise/i)).toBeInTheDocument()
    expect(screen.getByText('Bulldozers')).toBeInTheDocument()
    expect(screen.getByText('Tracteurs agricoles')).toBeInTheDocument()

    // Human capital
    expect(screen.getByText(/Des équipes d’experts forgées sur le terrain/i)).toBeInTheDocument()
    expect(screen.getByText('Ingénieurs & Cadres techniques')).toBeInTheDocument()
    expect(screen.getByText('Conducteurs d’engins lourds')).toBeInTheDocument()
    expect(screen.getByText('Mécaniciens & Électromécaniciens')).toBeInTheDocument()
    expect(screen.getByText('Chefs de pépinières & Pépiniéristes')).toBeInTheDocument()

    // Maintenance parks
    expect(screen.getByText(/4 Parcs et ateliers mécaniques régionaux/i)).toBeInTheDocument()
    expect(screen.getByText('Parc à matériel Bouira')).toBeInTheDocument()
    expect(screen.getByText('Parc à matériel Sidi Lakhdar')).toBeInTheDocument()
    expect(screen.getByText('Parc à matériel Khemis Miliana')).toBeInTheDocument()
    expect(screen.getByText('Parc à matériel Beni Slimane')).toBeInTheDocument()

    // Emergency interventions
    expect(screen.getByText(/Mobilisation d’urgence & Protection civile/i)).toBeInTheDocument()
    expect(screen.getByText('Feux de forêts & Pare-feu')).toBeInTheDocument()
    expect(screen.getByText('Désenclavement & Pistes hivernales')).toBeInTheDocument()
    expect(screen.getByText('Protection contre les crues')).toBeInTheDocument()
  })

  it('filters equipment by category tab', () => {
    renderResourcesPage()

    // Initially bulldozers and tractors are visible
    expect(screen.getByText('Bulldozers')).toBeInTheDocument()
    expect(screen.getByText('Tracteurs agricoles')).toBeInTheDocument()

    // Click on Agricultural category tab
    const agriculturalTab = screen.getByRole('tab', { name: /Matériel agricole/i })
    fireEvent.click(agriculturalTab)

    expect(screen.getByText('Tracteurs agricoles')).toBeInTheDocument()
    expect(screen.queryByText('Bulldozers')).not.toBeInTheDocument()
    expect(screen.queryByText('Niveleuses')).not.toBeInTheDocument()

    // Click on Earthworks tab
    const earthworksTab = screen.getByRole('tab', { name: /Terrassement et pistes/i })
    fireEvent.click(earthworksTab)

    expect(screen.getByText('Bulldozers')).toBeInTheDocument()
    expect(screen.getByText('Niveleuses')).toBeInTheDocument()
    expect(screen.queryByText('Tracteurs agricoles')).not.toBeInTheDocument()
  })

  it('filters equipment by search term and resets', () => {
    renderResourcesPage()

    const searchInput = screen.getByPlaceholderText(/Rechercher un engin/i)
    fireEvent.change(searchInput, { target: { value: 'Niveleuse' } })

    expect(screen.getByText('Niveleuses')).toBeInTheDocument()
    expect(screen.queryByText('Bulldozers')).not.toBeInTheDocument()
    expect(screen.queryByText('Tracteurs agricoles')).not.toBeInTheDocument()

    // Click reset button
    const resetButton = screen.getByRole('button', { name: /Réinitialiser la sélection/i })
    fireEvent.click(resetButton)

    expect(screen.getByText('Bulldozers')).toBeInTheDocument()
    expect(screen.getByText('Niveleuses')).toBeInTheDocument()
    expect(screen.getByText('Tracteurs agricoles')).toBeInTheDocument()
  })
})
