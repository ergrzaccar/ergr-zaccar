import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { NewsPage } from './NewsPage'

function renderNewsPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <NewsPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('NewsPage', () => {
  it('renders the hero section with proof badges and highlighted dossier', () => {
    renderNewsPage()

    // Hero title
    expect(
      screen.getByRole('heading', {
        name: /Actualités, communiqués officiels & actions de terrain/i,
      }),
    ).toBeInTheDocument()

    // Proof badges
    expect(screen.getByText(/Couverture des 8 wilayas d’intervention/i)).toBeInTheDocument()
    expect(screen.getByText(/Bulletins périodiques de campagne/i)).toBeInTheDocument()
    expect(screen.getByText(/Communiqués officiels certifiés/i)).toBeInTheDocument()
    expect(screen.getByText(/Service de presse réactif/i)).toBeInTheDocument()

    // Hero dossier card & media
    expect(
      screen.getByRole('heading', {
        name: /Relance historique du Barrage Vert/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByAltText(/ERGR Zaccar - Relance stratégique du Barrage Vert/i),
    ).toBeInTheDocument()
  })

  it('renders the news feed with featured article and articles grid', () => {
    renderNewsPage()

    // Section title
    expect(
      screen.getByRole('heading', {
        name: /Toutes les actualités & publications/i,
      }),
    ).toBeInTheDocument()

    // Featured badge
    expect(screen.getByText(/^À la une$/i)).toBeInTheDocument()

    // Featured and grid articles
    expect(
      screen.getByText(/Relance stratégique du Barrage Vert : déploiement massif de 1,2 million de plants/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Bilan semestriel : record de production historique avec 4,85 millions de plants/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Désenclavement montagnard : réception de 64 km de pistes rurales/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Partenariat scientifique : signature d’une convention-cadre de R&D/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Campagne estivale de prévention des incendies : 180 km de tranchées pare-feu/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Salon SIPSA-Filaha : l’ERGR Zaccar présente ses innovations/i),
    ).toBeInTheDocument()
  })

  it('allows filtering articles by category tab', () => {
    renderNewsPage()

    const nurseriesTab = screen.getByRole('tab', { name: /Pépinières & Plants/i })
    fireEvent.click(nurseriesTab)

    expect(
      screen.getByText(/Bilan semestriel : record de production historique avec 4,85 millions de plants/i),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Désenclavement montagnard : réception de 64 km de pistes rurales/i),
    ).not.toBeInTheDocument()
  })

  it('filters articles by search query and resets cleanly', () => {
    renderNewsPage()

    const searchInput = screen.getByRole('searchbox')
    fireEvent.change(searchInput, { target: { value: 'Miliana' } })

    expect(
      screen.getByText(/Désenclavement montagnard : réception de 64 km de pistes rurales/i),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Bilan semestriel : record de production historique avec 4,85 millions de plants/i),
    ).not.toBeInTheDocument()

    // Reset filters
    const resetBtn = screen.getByRole('button', { name: /Réinitialiser les filtres/i })
    fireEvent.click(resetBtn)

    expect(
      screen.getByText(/Bilan semestriel : record de production historique avec 4,85 millions de plants/i),
    ).toBeInTheDocument()
  })

  it('opens and closes the full article detail modal', () => {
    renderNewsPage()

    // Find and click the first "Lire l’article complet" button
    const readButtons = screen.getAllByRole('button', { name: /Lire l’article complet/i })
    expect(readButtons.length).toBeGreaterThan(0)
    fireEvent.click(readButtons[0])

    // Modal dialog is open
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
    expect(screen.getByText(/Fiche d’actualité & Reportage de terrain/i)).toBeInTheDocument()
    expect(screen.getByText(/Rédigé par :/i)).toBeInTheDocument()
    expect(screen.getByText(/Wilayas concernées :/i)).toBeInTheDocument()

    // Close modal
    const closeButtons = screen.getAllByRole('button', { name: /Fermer l’article/i })
    expect(closeButtons.length).toBeGreaterThanOrEqual(1)
    fireEvent.click(closeButtons[0])

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the press kit downloads and media relations CTA', () => {
    renderNewsPage()

    // Press kit section
    expect(
      screen.getByRole('heading', {
        name: /Kit média & Ressources institutionnelles/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Dossier de Presse Officiel 2026/i)).toBeInTheDocument()
    expect(screen.getByText(/Charte Graphique & Pack Logos HD/i)).toBeInTheDocument()
    expect(screen.getByText(/Pack Photographique HD Chantiers & Pépinières/i)).toBeInTheDocument()

    // CTA section
    expect(
      screen.getByRole('heading', {
        name: /Une demande d’interview, d’information ou de reportage \?/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/presse@ergr-zaccar\.dz/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/\+213 \(0\) 23 85 41 20/i).length).toBeGreaterThan(0)
  })
})
