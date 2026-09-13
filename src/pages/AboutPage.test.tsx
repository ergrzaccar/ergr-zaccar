import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppProviders } from '../app/providers/AppProviders'
import { AboutPage } from './AboutPage'

function renderAboutPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('AboutPage', () => {
  it('renders the hero section with proof badges and identity dossier', () => {
    renderAboutPage()

    // Hero title & eyebrow
    expect(
      screen.getByRole('heading', {
        name: /Plus d’un demi-siècle au service du génie rural et des forêts algériennes/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Institution')).toBeInTheDocument()

    // Proof badges
    expect(screen.getByText(/Fondée en 1971 \(50\+ ans d’histoire\)/i)).toBeInTheDocument()
    expect(screen.getByText(/471 100 000 DA de capital social/i)).toBeInTheDocument()
    expect(screen.getByText(/Filiale 100% Groupe Génie Rural/i)).toBeInTheDocument()
    expect(screen.getByText(/8 wilayas d’ancrage territorial/i)).toBeInTheDocument()

    // Hero dossier card & image
    expect(screen.getByText(/Entreprise citoyenne & actrice du développement rural/i)).toBeInTheDocument()
    expect(
      screen.getByAltText(/Siège social de l'ERGR Zaccar à Rouiba, Alger/i),
    ).toBeInTheDocument()
  })

  it('renders the leadership section with the DG message and portrait', () => {
    renderAboutPage()

    // Heading
    expect(
      screen.getByRole('heading', {
        name: /Le mot de la Direction Générale/i,
      }),
    ).toBeInTheDocument()

    // Quote
    expect(
      screen.getByText(/« Bâtir un avenir vert, résilient et prospère pour les territoires ruraux de notre pays. »/i),
    ).toBeInTheDocument()

    // Author and role
    expect(screen.getAllByText(/Direction Générale/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Président Directeur Général - ERGR Zaccar/i).length).toBeGreaterThan(0)

    // Portrait image
    expect(
      screen.getByAltText(/Président Directeur Général - ERGR Zaccar/i),
    ).toBeInTheDocument()
  })

  it('renders the 3 historical eras in the timeline', () => {
    renderAboutPage()

    // Timeline title
    expect(
      screen.getByRole('heading', {
        name: /De l’ONTF à l’ERGR Zaccar : Cinq décennies d’engagement/i,
      }),
    ).toBeInTheDocument()

    // Eras
    expect(
      screen.getByRole('heading', {
        name: /Office National des Travaux Forestiers/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Office Régional de Développement Forestier/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('heading', {
        name: /Entreprise Régionale de Génie Rural Zaccar/i,
      }).length,
    ).toBeGreaterThanOrEqual(1)

    // Periods
    expect(screen.getByText(/1971 - 1990/i)).toBeInTheDocument()
    expect(screen.getByText(/1990 - 1998/i)).toBeInTheDocument()
    expect(screen.getByText(/1998 - Aujourd'hui/i)).toBeInTheDocument()

    // Milestones
    expect(
      screen.getByText(/Lancement des grands chantiers nationaux de reboisement/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Décentralisation opérationnelle dans le Centre et l’Ouest/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Rôle pivot dans la relance gouvernementale du Barrage Vert/i),
    ).toBeInTheDocument()
  })

  it('renders the group affiliation section with institutional specs and synergies', () => {
    renderAboutPage()

    // Section title
    expect(
      screen.getByRole('heading', {
        name: /Une filiale d’excellence du Groupe Génie Rural \(GGR\)/i,
      }),
    ).toBeInTheDocument()

    // Institutional specs
    expect(screen.getByText(/Ministère de l'Agriculture et du Développement Rural/i)).toBeInTheDocument()
    expect(screen.getByText(/100% Groupe Génie Rural \(GGR\)/i)).toBeInTheDocument()

    // Features
    expect(
      screen.getByRole('heading', {
        name: /Synergies industrielles inter-filiales/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Gouvernance moderne & Contrôle de gestion/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Tutelle & Politiques publiques sectorielles/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the 4 core corporate values', () => {
    renderAboutPage()

    // Values section title
    expect(
      screen.getByRole('heading', {
        name: /Les quatre piliers de notre engagement/i,
      }),
    ).toBeInTheDocument()

    // 4 values
    expect(
      screen.getByRole('heading', {
        name: /Rigueur & Excellence technique/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Devoir de Service Public & Citoyenneté/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Préservation Écologique & Barrage Vert/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Ancrage Territorial & Proximité Humaine/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the Vision 2030 section with its 3 strategic pillars', () => {
    renderAboutPage()

    // Vision heading
    expect(
      screen.getByRole('heading', {
        name: /Cap 2030 : Le génie rural moderne et bas-carbone/i,
      }),
    ).toBeInTheDocument()

    // 3 pillars
    expect(
      screen.getByRole('heading', {
        name: /Renouvellement & Modernisation de la flotte/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Sécurité semencière & Biodiversité rustique/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Digitalisation & Cartographie SIG/i,
      }),
    ).toBeInTheDocument()

    // Action tags
    expect(screen.getByText(/Modernisation des équipements lourds/i)).toBeInTheDocument()
    expect(screen.getByText(/Multiplication de plants certifiés/i)).toBeInTheDocument()
    expect(screen.getByText(/Suivi numérique des chantiers/i)).toBeInTheDocument()
  })

  it('renders the closing CTA section with links to organization and projects', () => {
    renderAboutPage()

    // CTA title
    expect(
      screen.getByRole('heading', {
        name: /Découvrez l’organisation et les compétences de l’entreprise/i,
      }),
    ).toBeInTheDocument()

    // Navigation links
    const orgLink = screen.getByRole('link', {
      name: /Consulter l’organisation territoriale/i,
    })
    expect(orgLink).toBeInTheDocument()
    expect(orgLink).toHaveAttribute('href', '/organisation-implantation')

    const projectsLink = screen.getByRole('link', {
      name: /Explorer nos réalisations/i,
    })
    expect(projectsLink).toBeInTheDocument()
    expect(projectsLink).toHaveAttribute('href', '/projets')
  })
})
