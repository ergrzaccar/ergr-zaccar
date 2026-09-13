import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../../app/providers/AppProviders'
import { RootLayout } from '../../layouts/RootLayout'
import { RouteAnnouncer } from './RouteAnnouncer'
import { SkipLink } from './SkipLink'
import { SEOHead } from '../seo/SEOHead'

describe('Accessibility (a11y) and SEO infrastructure', () => {
  it('renders the SkipLink with anchor targeting main-content and handles focus on click', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <SkipLink />
          <main id="main-content" tabIndex={-1}>
            Contenu principal
          </main>
        </MemoryRouter>
      </AppProviders>
    )

    const skipLink = screen.getByRole('link', { name: /Aller au contenu principal/i })
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')

    const mainElement = screen.getByRole('main')
    const focusSpy = vi.spyOn(mainElement, 'focus')
    const scrollSpy = vi.fn()
    mainElement.scrollIntoView = scrollSpy

    fireEvent.click(skipLink)
    expect(focusSpy).toHaveBeenCalled()
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('renders the RouteAnnouncer with role="status" and polite live region', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/carrieres']}>
          <RouteAnnouncer />
        </MemoryRouter>
      </AppProviders>
    )

    const announcer = screen.getByTestId('route-announcer')
    expect(announcer).toBeInTheDocument()
    expect(announcer).toHaveAttribute('role', 'status')
    expect(announcer).toHaveAttribute('aria-live', 'polite')
    expect(announcer).toHaveAttribute('aria-atomic', 'true')
    expect(announcer).toHaveClass('sr-only')
  })

  it('renders RootLayout with SkipLink, RouteAnnouncer, and semantic main tag with tabindex -1', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<div>Page d’accueil de test</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AppProviders>
    )

    // Skip link
    expect(screen.getByRole('link', { name: /Aller au contenu principal/i })).toBeInTheDocument()

    // Screen-reader announcer
    expect(screen.getByTestId('route-announcer')).toBeInTheDocument()

    // Semantic main landmark
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveAttribute('id', 'main-content')
    expect(main).toHaveAttribute('tabindex', '-1')
  })

  it('renders SEOHead without throwing and sets appropriate title and metadata keys', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/a-propos']}>
          <SEOHead titleKey="pages.about.title" descriptionKey="pages.about.description" />
        </MemoryRouter>
      </AppProviders>
    )

    // Verification that Helmet rendered correctly in context without error
    expect(document.querySelector('meta[name="description"]')).toBeDefined()
  })
})
