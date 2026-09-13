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
  it('renders the hero, directory, and key metrics', () => {
    renderNurseriesPage()

    expect(
      screen.getByRole('heading', {
        name: /Le réseau stratégique des pépinières de production végétale/i,
      }),
    ).toBeInTheDocument()

    // Key infrastructures & proof badges
    expect(screen.getAllByText('133 ha sous irrigation pérenne')).toHaveLength(2)
    expect(screen.getByText('165,5 ha de SAU productive')).toBeInTheDocument()

    // 9 nurseries should be listed initially
    expect(screen.getByText('Aïn Aloui')).toBeInTheDocument()
    expect(screen.getByText('Sidi Lakhdar')).toBeInTheDocument()
    expect(screen.getByText('Hadjout')).toBeInTheDocument()
    expect(screen.getByText('Oued Sly')).toBeInTheDocument()
  })

  it('filters nurseries by search query', () => {
    renderNurseriesPage()

    const searchInput = screen.getByRole('searchbox')
    fireEvent.change(searchInput, { target: { value: 'Sidi Lakhdar' } })

    expect(screen.getByText('Sidi Lakhdar')).toBeInTheDocument()
    expect(screen.queryByText('Aïn Aloui')).not.toBeInTheDocument()
  })

  it('filters nurseries by wilaya chip', () => {
    renderNurseriesPage()

    // Click on Bouira wilaya chip
    const bouiraChip = screen.getByRole('button', { name: 'Bouira' })
    fireEvent.click(bouiraChip)

    expect(screen.getByText('Aïn Aloui')).toBeInTheDocument()
    expect(screen.queryByText('Sidi Lakhdar')).not.toBeInTheDocument()
  })
})
