import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { ContactPage } from './ContactPage'

function renderContactPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('ContactPage', () => {
  it('renders the hero section with proof badges and identity card', () => {
    renderContactPage()

    // Hero title & eyebrow
    expect(
      screen.getByRole('heading', {
        name: /À votre écoute pour vos projets d’aménagement rural et forestier/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Contact institutionnel/i)).toBeInTheDocument()

    // Proof badges
    expect(screen.getByText(/Siège social à Rouiba \(Alger\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Dimanche au Jeudi : 08h00 - 16h30/i)).toBeInTheDocument()
    expect(screen.getByText(/3 Directions Régionales & 8 Unités/i)).toBeInTheDocument()
    expect(screen.getByText(/Permanence feux de forêts & intempéries/i)).toBeInTheDocument()

    // Hero dossier card & image
    expect(
      screen.getByRole('heading', {
        name: /Une écoute réactive et un accompagnement de proximité/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByAltText(/Siège social de l'ERGR Zaccar à Rouiba, Alger/i),
    ).toBeInTheDocument()
  })

  it('validates the contact form and handles successful submission', async () => {
    renderContactPage()

    const submitBtn = screen.getByRole('button', { name: /Envoyer la demande/i })
    fireEvent.click(submitBtn)

    // Required errors appear
    const errorMessages = screen.getAllByText(/Ce champ est obligatoire/i)
    expect(errorMessages.length).toBeGreaterThanOrEqual(3)

    // Fill valid data
    const nameInput = screen.getByLabelText(/Nom et prénom/i)
    const emailInput = screen.getByLabelText(/Adresse email/i)
    const messageInput = screen.getByLabelText(/Détails de votre message/i)

    fireEvent.change(nameInput, { target: { value: 'Karim Hadj' } })
    fireEvent.change(emailInput, { target: { value: 'karim@example.dz' } })
    fireEvent.change(messageInput, {
      target: { value: 'Demande de devis pour 50 000 plants forestiers de pin d’Alep.' },
    })

    // Submit form
    fireEvent.click(submitBtn)

    // Success card appears
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Votre message a bien été transmis !/i }),
      ).toBeInTheDocument()
    })
    expect(screen.getByText(/Réf. dossier :/i)).toBeInTheDocument()
    expect(screen.getByText(/ERGR-2026-/i)).toBeInTheDocument()

    // Reset action
    const resetBtn = screen.getByRole('button', { name: /Envoyer un autre message/i })
    fireEvent.click(resetBtn)

    // Form is back
    expect(screen.getByLabelText(/Nom et prénom/i)).toBeInTheDocument()
  })

  it('renders headquarters coordinates and central departments', () => {
    renderContactPage()

    // Headquarters title
    expect(
      screen.getByRole('heading', {
        name: /Direction Générale - Haouch Rouiba/i,
      }),
    ).toBeInTheDocument()

    // Address and contacts
    expect(screen.getByText(/Haouch Rouiba - BP 34, Rouiba 16012, Alger/i)).toBeInTheDocument()
    expect(screen.getAllByText(/\+213 \(0\) 23 85 41 20/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/contact@ergr-zaccar.dz/i).length).toBeGreaterThan(0)

    // Central departments
    expect(screen.getByText(/Direction Technique & Chantiers/i)).toBeInTheDocument()
    expect(screen.getByText(/technique@ergr-zaccar.dz/i)).toBeInTheDocument()
    expect(screen.getByText(/Direction des Pépinières & Végétaux/i)).toBeInTheDocument()
    expect(screen.getAllByText(/pepinieres@ergr-zaccar.dz/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Direction des Marchés Publics/i)).toBeInTheDocument()
    expect(screen.getAllByText(/marches@ergr-zaccar.dz/i).length).toBeGreaterThan(0)
  })

  it('renders the 3 regional directions directory', () => {
    renderContactPage()

    expect(
      screen.getByRole('heading', {
        name: /Nos 3 Directions Régionales et leurs unités/i,
      }),
    ).toBeInTheDocument()

    // 3 DR names
    expect(screen.getByText(/Direction Régionale Centre-Est - Bouira/i)).toBeInTheDocument()
    expect(screen.getByText(/Direction Régionale Ouest - Chlef/i)).toBeInTheDocument()
    expect(screen.getByText(/Direction Régionale Centre - Médéa/i)).toBeInTheDocument()

    // Emails
    expect(screen.getByText(/dr\.bouira@ergr-zaccar\.dz/i)).toBeInTheDocument()
    expect(screen.getByText(/dr\.chlef@ergr-zaccar\.dz/i)).toBeInTheDocument()
    expect(screen.getByText(/dr\.medea@ergr-zaccar\.dz/i)).toBeInTheDocument()
  })

  it('allows toggling FAQ accordion items', () => {
    renderContactPage()

    expect(
      screen.getByRole('heading', {
        name: /Questions fréquentes sur nos services/i,
      }),
    ).toBeInTheDocument()

    // Find first question button
    const firstQButton = screen.getByRole('button', {
      name: /Comment passer commande de plants auprès de nos 9 pépinières \?/i,
    })
    expect(firstQButton).toHaveAttribute('aria-expanded', 'true')

    // Find second question button and click it
    const secondQButton = screen.getByRole('button', {
      name: /Quels sont les délais de mobilisation de vos engins pour les pistes \?/i,
    })
    fireEvent.click(secondQButton)

    expect(secondQButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Pour les travaux de désenclavement et d’ouverture de pistes/i)).toBeInTheDocument()
  })

  it('renders the emergency and duty hotline banner', () => {
    renderContactPage()

    expect(
      screen.getByRole('heading', {
        name: /Cellule de crise & Liaison secours/i,
      }),
    ).toBeInTheDocument()

    // Emergency numbers
    expect(screen.getByText('1070')).toBeInTheDocument()
    expect(screen.getByText('14 / 1021')).toBeInTheDocument()
    expect(screen.getByText(/Numéro vert Forêts \(DGF\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Protection Civile/i)).toBeInTheDocument()
  })
})
