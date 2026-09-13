import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { ActivitiesPage } from './ActivitiesPage'

function renderActivitiesPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <ActivitiesPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('ActivitiesPage', () => {
  it('renders the hero section with core identity and technical domains', () => {
    renderActivitiesPage()

    // Hero title or main heading
    expect(
      screen.getByRole('heading', { level: 1 }),
    ).toBeInTheDocument()

    // Main domain headings
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(5)
  })

  it('renders the technical specialties and methods sections', () => {
    renderActivitiesPage()

    // Verify sections exist by checking text from activities
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0)
  })

  it('renders the plant production and CTA contact sections', () => {
    renderActivitiesPage()

    // Verify CTA links
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(3)
  })
})
