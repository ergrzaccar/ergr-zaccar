import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../../app/providers/AppProviders'
import { AlertFloatingButton } from './AlertFloatingButton'

function renderFloatingButton(props = {}) {
  return render(
    <AppProviders>
      <AlertFloatingButton {...props} />
    </AppProviders>
  )
}

describe('AlertFloatingButton', () => {
  it('renders the floating button with context-specific label for tenders', () => {
    renderFloatingButton({ defaultTopic: 'tenders' })

    const fabBtn = screen.getByRole('button', { name: /Alertes Marchés Publics/i })
    expect(fabBtn).toBeInTheDocument()
    expect(fabBtn).toHaveClass('alert-fab-btn')
  })

  it('renders the floating button with context-specific label for careers', () => {
    renderFloatingButton({ defaultTopic: 'careers' })

    const fabBtn = screen.getByRole('button', { name: /Alertes Recrutement & Concours/i })
    expect(fabBtn).toBeInTheDocument()
  })

  it('opens modal on click and closes on close button', () => {
    renderFloatingButton({ defaultTopic: 'tenders' })

    const fabBtn = screen.getByRole('button', { name: /Alertes Marchés Publics/i })
    fireEvent.click(fabBtn)

    // Modal is open
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Fermer la fenêtre/i })).toBeInTheDocument()

    // Inner subscription card is rendered inside modal
    expect(screen.getByRole('region', { name: /Abonnement aux Alertes & Consultations/i })).toBeInTheDocument()

    // Close on X button
    const closeBtn = screen.getByRole('button', { name: /Fermer la fenêtre/i })
    fireEvent.click(closeBtn)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes modal on Escape key press', () => {
    renderFloatingButton({ defaultTopic: 'tenders' })

    const fabBtn = screen.getByRole('button', { name: /Alertes Marchés Publics/i })
    fireEvent.click(fabBtn)

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
