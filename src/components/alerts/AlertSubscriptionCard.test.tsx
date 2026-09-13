import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AppProviders } from '../../app/providers/AppProviders'
import { AlertSubscriptionCard } from './AlertSubscriptionCard'

function renderComponent(props = {}) {
  return render(
    <AppProviders>
      <AlertSubscriptionCard {...props} />
    </AppProviders>
  )
}

describe('AlertSubscriptionCard', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly with default topic tenders', () => {
    renderComponent({ defaultTopic: 'tenders' })

    expect(screen.getByRole('heading', { name: /Abonnement aux Alertes & Consultations/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Marchés publics & Consultations/i)).toBeChecked()
    expect(screen.getByLabelText(/Avis de recrutement & Concours/i)).not.toBeChecked()
    expect(screen.getByPlaceholderText(/votre-nom@exemple.dz/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Activer mes alertes/i })).toBeInTheDocument()
    expect(screen.getByText(/loi n° 18-07/i)).toBeInTheDocument()
  })

  it('renders correctly with default topic careers', () => {
    renderComponent({ defaultTopic: 'careers' })

    expect(screen.getByLabelText(/Marchés publics & Consultations/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Avis de recrutement & Concours/i)).toBeChecked()
  })

  it('shows validation error when email is invalid or empty', () => {
    renderComponent()

    const submitBtn = screen.getByRole('button', { name: /Activer mes alertes/i })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Veuillez saisir une adresse e-mail valide/i)).toBeInTheDocument()

    const emailInput = screen.getByPlaceholderText(/votre-nom@exemple.dz/i)
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Veuillez saisir une adresse e-mail valide/i)).toBeInTheDocument()
  })

  it('shows validation error when no topic is selected', () => {
    renderComponent({ defaultTopic: 'tenders' })

    const tendersCheckbox = screen.getByLabelText(/Marchés publics & Consultations/i)
    fireEvent.click(tendersCheckbox) // uncheck it

    const emailInput = screen.getByPlaceholderText(/votre-nom@exemple.dz/i)
    fireEvent.change(emailInput, { target: { value: 'fournisseur@btph.dz' } })

    const submitBtn = screen.getByRole('button', { name: /Activer mes alertes/i })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Veuillez sélectionner au moins une catégorie d’alerte/i)).toBeInTheDocument()
  })

  it('submits successfully and shows success state', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Votre abonnement aux alertes a été enregistré',
      }),
    })
    vi.spyOn(window, 'fetch').mockImplementation(fetchMock as unknown as typeof fetch)

    renderComponent({ defaultTopic: 'tenders' })

    const orgInput = screen.getByPlaceholderText(/SARL BTPH Algérie/i)
    const emailInput = screen.getByPlaceholderText(/votre-nom@exemple.dz/i)
    const submitBtn = screen.getByRole('button', { name: /Activer mes alertes/i })

    fireEvent.change(orgInput, { target: { value: 'Entreprise Bois & Forêts' } })
    fireEvent.change(emailInput, { target: { value: 'contact@boisforet.dz' } })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/alerts/subscribe',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'contact@boisforet.dz',
            organizationName: 'Entreprise Bois & Forêts',
            tenders: true,
            careers: false,
            language: 'fr',
          }),
        })
      )
    })

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Abonnement confirmé !/i, level: 3 })
      ).toBeInTheDocument()
      expect(screen.getByText('contact@boisforet.dz')).toBeInTheDocument()
    })

    // Click reset to return to form
    const resetBtn = screen.getByRole('button', { name: /Modifier les options ou inscrire un autre e-mail/i })
    fireEvent.click(resetBtn)

    expect(screen.getByPlaceholderText(/votre-nom@exemple.dz/i)).toBeInTheDocument()
  })
})
