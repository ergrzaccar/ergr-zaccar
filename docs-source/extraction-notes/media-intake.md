# Integration des medias

## Classement attendu

- `hero` : images fortes pour la page d'accueil.
- `nurseries` : photos des pepinieres et productions de plants.
- `projects` : chantiers, amenagements ruraux, reboisements, travaux forestiers.
- `equipment` : engins, parcs a materiel, ateliers, flotte.
- `headquarters` : siege de Rouiba, direction generale, vues institutionnelles.
- `team` : equipes, encadrement, interventions terrain.
- `organization` : cartes, schema d'implantation, organigrammes convertis.
- `news` : photos d'actualites et evenements.

## Nommage recommande

Format :

```txt
category-location-subject-index.ext
```

Exemples :

```txt
hero-rouiba-headquarters-01.webp
nursery-ain-aloui-plants-01.webp
project-medea-reforestation-01.webp
equipment-park-bouira-machine-01.webp
team-field-operation-01.webp
organization-regional-map-01.svg
```

## Formats cibles

- Photos : `webp`, avec original conserve hors `public/` si possible.
- Logo : `svg` idealement, sinon `png` transparent optimise.
- Cartes et motifs : `svg` si vectoriels.

## Tailles recommandees

- Hero desktop : 2400 px de large maximum.
- Hero mobile : 1200 px de large maximum.
- Cartes et apercus : 1200 px de large maximum.
- Miniatures : 640 px de large maximum.

Les images non critiques seront chargees en lazy loading.
