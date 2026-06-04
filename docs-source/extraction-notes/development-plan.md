# Plan de developpement

## Etape 1 : assets + data

- Finaliser extraction des PowerPoint vers `src/data`.
- Optimiser logo et photos.
- Creer les variantes media necessaires.
- Completer les contenus manquants.

## Etape 2 : routing + i18n

- Installer et configurer le routing.
- Installer et configurer l'i18n FR / AR.
- Gerer `lang` et `dir` sur `document.documentElement`.

## Etape 3 : theme light / dark

- Creer les tokens CSS light et dark.
- Implementer les trois preferences : systeme, clair, sombre.
- Sauvegarder le choix dans `localStorage`.
- Respecter `prefers-color-scheme`.
- Ajouter le controle de theme dans le Header.
- Verifier la matrice FR / AR x light / dark.

## Etape 4 : layout global

- Header desktop.
- Menu mobile premium.
- Footer institutionnel.
- Selecteur langue.
- Selecteur theme.
- Conteneurs et grille globale.

## Etape 5 : design system

- Boutons.
- Cartes.
- Sections.
- Formulaires.
- Fonds topographiques.
- Composants de chiffres cles.
- Etats hover, focus, active, disabled.

## Etape 6 : page d'accueil

- Hero cartographique premium.
- Chiffres cles.
- Domaines d'activite.
- Carte d'implantation.
- Pepinieres.
- Moyens et projets.
- Appels d'action.

## Etape 7 : pages secondaires

- A propos.
- Domaines d'activite.
- Pepinieres.
- Realisations / Projets.
- Moyens humains et materiels.
- Organisation / Implantation.
- Actualites.
- Appels d'offres / Consultations.
- Carrieres.
- Contact.

## Etape 8 : animations avancees

- Hero avec lignes topographiques animees.
- Carte vivante d'implantation.
- Compteurs animes.
- Timeline historique.
- Transitions de sections.
- Animations adaptees RTL / LTR.
- Respect complet de `prefers-reduced-motion`.

## Etape 9 : tests + optimisation + build

- Tests unitaires des composants critiques.
- Tests e2e des parcours principaux.
- Verification light / dark.
- Verification FR / AR.
- Performance images et lazy loading.
- SEO et accessibilite.
- `npm run lint`, `npm run test`, `npm run build`.
