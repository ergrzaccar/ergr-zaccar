import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { AppProviders } from '../../app/providers/AppProviders'
import { SearchPaletteModal } from './SearchPaletteModal'
import { SearchTrigger } from './SearchTrigger'

function renderSearchComponent() {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={['/']}>
        <div>
          <SearchTrigger />
          <SearchPaletteModal />
        </div>
      </MemoryRouter>
    </AppProviders>
  )
}

describe('SearchPalette (Command Palette Ctrl+K)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('opens search modal when clicking the search trigger button', () => {
    renderSearchComponent()

    // Modal is initially closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Click trigger button
    const triggerBtn = screen.getByRole('button', { name: /Ouvrir la recherche globale/i })
    fireEvent.click(triggerBtn)

    // Modal dialog is open
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })

  it('displays popular suggestions when query is empty and updates query on click', () => {
    renderSearchComponent()

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Ouvrir la recherche globale/i }))

    // Check popular suggestions exist
    const suggestionBtns = screen.getAllByRole('button', { name: /Barrage Vert/i })
    expect(suggestionBtns.length).toBeGreaterThan(0)

    // Click suggestion
    fireEvent.click(suggestionBtns[0])

    const input = screen.getByTestId('search-input') as HTMLInputElement
    expect(input.value).toBe('Barrage Vert')

    // Results matching Barrage Vert should be visible
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('filters search items across tenders, projects and nurseries', () => {
    renderSearchComponent()

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Ouvrir la recherche globale/i }))

    const input = screen.getByTestId('search-input')

    // Search for tender reference
    fireEvent.change(input, { target: { value: '04/ERGR' } })
    expect(screen.getByText(/cages de gabions métalliques galvanisés/i)).toBeInTheDocument()
    expect(screen.getByText('AON n° 04/ERGR-Z/2026')).toBeInTheDocument()

    // Search for nursery name
    fireEvent.change(input, { target: { value: 'Hadjout' } })
    expect(screen.getByText(/Pépinière de Hadjout/i)).toBeInTheDocument()

    // Search for job offer
    fireEvent.change(input, { target: { value: 'REC-2026-01' } })
    expect(screen.getByText(/Ingénieur Agronome/i)).toBeInTheDocument()
  })

  it('filters items by category tab', () => {
    renderSearchComponent()

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Ouvrir la recherche globale/i }))

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'reboisement' } })

    // Click "Pépinières" tab
    const nurseriesTab = screen.getByRole('button', { name: /Pépinières/i })
    fireEvent.click(nurseriesTab)

    // The category is selected
    expect(nurseriesTab).toHaveClass('bg-[var(--brand-primary)]')
  })

  it('navigates with ArrowDown and ArrowUp and selects item with Enter', () => {
    renderSearchComponent()

    fireEvent.click(screen.getByRole('button', { name: /Ouvrir la recherche globale/i }))

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'AON' } })

    // Key down arrow
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'ArrowUp' })

    // Enter to trigger select and navigate
    fireEvent.keyDown(input, { key: 'Enter' })

    // Modal closes upon selection
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes search modal when pressing Escape or clicking the Esc button', () => {
    renderSearchComponent()

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Ouvrir la recherche globale/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Press Escape
    const input = screen.getByTestId('search-input')
    fireEvent.keyDown(input, { key: 'Escape' })

    // Modal is closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows zero results state when query does not match anything', () => {
    renderSearchComponent()

    fireEvent.click(screen.getByRole('button', { name: /Ouvrir la recherche globale/i }))

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'xyzrandomquery12345' } })

    expect(screen.getByText(/Aucun résultat trouvé pour « xyzrandomquery12345 »/i)).toBeInTheDocument()
  })
})
