import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AlertBanner } from './AlertBanner'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'alertsSubscription.bannerTendersTag': 'Veille Marchés Publics',
        'alertsSubscription.bannerTendersTitle': 'Ne manquez aucun avis d’appel d’offres ou consultation',
        'alertsSubscription.bannerTendersDesc': 'Recevez automatiquement par e-mail chaque nouvelle publication officielle.',
        'alertsSubscription.bannerTendersBtn': 'Activer mes alertes marchés',
        'alertsSubscription.bannerCareersTag': 'Veille Emploi & Concours',
        'alertsSubscription.bannerCareersTitle': 'Soyez informé(e) des nouvelles opportunités de carrière',
        'alertsSubscription.bannerCareersDesc': 'Recevez par e-mail nos avis de recrutement et concours dès leur ouverture.',
        'alertsSubscription.bannerCareersBtn': 'Activer mes alertes emploi',
      }
      return translations[key] || key
    },
  }),
}))

describe('AlertBanner (Solution B)', () => {
  it('renders tenders alert banner correctly', () => {
    render(<AlertBanner topic="tenders" />)

    expect(screen.getByText('Veille Marchés Publics')).toBeInTheDocument()
    expect(screen.getByText('Ne manquez aucun avis d’appel d’offres ou consultation')).toBeInTheDocument()
    expect(screen.getByText('Activer mes alertes marchés')).toBeInTheDocument()
  })

  it('renders careers alert banner correctly', () => {
    render(<AlertBanner topic="careers" />)

    expect(screen.getByText('Veille Emploi & Concours')).toBeInTheDocument()
    expect(screen.getByText('Soyez informé(e) des nouvelles opportunités de carrière')).toBeInTheDocument()
    expect(screen.getByText('Activer mes alertes emploi')).toBeInTheDocument()
  })

  it('scrolls to subscription element and applies glow when button is clicked', () => {
    const mockScrollIntoView = vi.fn()
    const targetDiv = document.createElement('div')
    targetDiv.id = 'alerts-subscription'
    targetDiv.scrollIntoView = mockScrollIntoView
    document.body.appendChild(targetDiv)

    render(<AlertBanner topic="tenders" targetId="alerts-subscription" />)

    const button = screen.getByRole('button', { name: 'Activer mes alertes marchés' })
    fireEvent.click(button)

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' })
    expect(targetDiv.classList.contains('alert-card-highlighted')).toBe(true)

    document.body.removeChild(targetDiv)
  })
})
