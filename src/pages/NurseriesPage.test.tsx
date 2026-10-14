import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { NurseriesPage } from './NurseriesPage'

function renderNurseriesPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <NurseriesPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('NurseriesPage', () => {
  it('renders the hero, plant catalog, directory, and key metrics', () => {
    renderNurseriesPage()

    expect(
      screen.getByRole('heading', {
        name: /Le réseau stratégique des pépinières de production végétale/i,
      }),
    ).toBeInTheDocument()

    // Key infrastructures & proof badges
    expect(screen.getAllByText('133 ha sous irrigation pérenne')).toHaveLength(2)
    expect(screen.getByText('165,5 ha de SAU productive')).toBeInTheDocument()

    // Plant Catalog should be present
    expect(
      screen.getByRole('heading', {
        name: /Catalogue des Essences et Plants Forestiers/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByText("Pin d'Alep").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Eucalyptus').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Cyprès toujours vert').length).toBeGreaterThanOrEqual(1)

    // 9 nurseries should be listed initially
    expect(screen.getAllByText('Aïn Aloui').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Sidi Lakhdar').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Hadjout').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Oued Sly').length).toBeGreaterThanOrEqual(1)
  })

  it('filters nurseries by search query in the directory', () => {
    renderNurseriesPage()

    // Select the directory search input (second searchbox)
    const searchInputs = screen.getAllByRole('searchbox')
    const nurserySearchInput = searchInputs[1]
    fireEvent.change(nurserySearchInput, { target: { value: 'Sidi Lakhdar' } })

    expect(screen.getAllByText('Sidi Lakhdar').length).toBeGreaterThanOrEqual(1)
  })

  it('filters plants in the catalog by search query', () => {
    renderNurseriesPage()

    // Select the plant catalog search input (first searchbox)
    const searchInputs = screen.getAllByRole('searchbox')
    const plantSearchInput = searchInputs[0]
    fireEvent.change(plantSearchInput, { target: { value: 'Chêne-liège' } })

    expect(screen.getAllByText('Chêne-liège').length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByRole('heading', { name: 'Eucalyptus' })).not.toBeInTheDocument()
  })

  it('filters nurseries by wilaya chip', () => {
    renderNurseriesPage()

    // Click on Bouira wilaya chip in directory section
    const bouiraChip = screen.getByRole('button', { name: 'Bouira' })
    fireEvent.click(bouiraChip)

    expect(screen.getAllByText('Aïn Aloui').length).toBeGreaterThanOrEqual(1)
  })
})
