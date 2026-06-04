# Direction artistique et design system

Direction validee : genie rural technique / cartographique, enrichi par une
sobriete institutionnelle premium et quelques touches modernes discretes.

## Couleurs

- Vert territoire : `#0E3B2E`
- Vert forestier : `#1F6B45`
- Vert vegetal : `#3C8C5A`
- Bleu hydrographique : `#2F6F8F`
- Beige mineral : `#E7DDC8`
- Blanc administratif : `#F8F7F2`
- Anthracite : `#1D2522`
- Dore institutionnel : `#B99A4A`

## Themes light / dark

Le site doit supporter trois preferences utilisateur :

- `system` : suit `prefers-color-scheme`.
- `light` : force le mode clair.
- `dark` : force le mode sombre.

Le choix sera conserve dans `localStorage` avec une cle stable, par exemple
`ergr-zaccar-theme`. Le theme actif sera applique sur `document.documentElement`
via `data-theme="light"` ou `data-theme="dark"`, avec `color-scheme` adapte.

Le mode sombre ne doit pas etre une inversion automatique. Les deux modes doivent
avoir leur propre direction visuelle :

- Light mode : institutionnel, clair, administratif, mineral, lisible.
- Dark mode : premium, profond, cartographique, technique, avec contraste maitrise.

### Tokens light

- `--surface-page`: `#F8F7F2`
- `--surface-section`: `#FFFFFF`
- `--surface-elevated`: `#FDFBF4`
- `--text-primary`: `#1D2522`
- `--text-secondary`: `#4C5A53`
- `--border-subtle`: `#D9D2C1`
- `--brand-primary`: `#0E3B2E`
- `--brand-secondary`: `#1F6B45`
- `--brand-accent`: `#B99A4A`
- `--technical-blue`: `#2F6F8F`
- `--topographic-line`: `rgba(14, 59, 46, 0.14)`
- `--focus-ring`: `#2F6F8F`

### Tokens dark

- `--surface-page`: `#07140F`
- `--surface-section`: `#0B1F18`
- `--surface-elevated`: `#102A21`
- `--text-primary`: `#F5F1E7`
- `--text-secondary`: `#B8C7BD`
- `--border-subtle`: `#244438`
- `--brand-primary`: `#8FD19E`
- `--brand-secondary`: `#3C8C5A`
- `--brand-accent`: `#D7BA62`
- `--technical-blue`: `#71B8C8`
- `--topographic-line`: `rgba(143, 209, 158, 0.16)`
- `--focus-ring`: `#D7BA62`

### Impact UI par theme

- Header : fond clair translucide en light, fond vert tres profond en dark.
- Boutons : conserver une hierarchie nette, avec contrastes AA minimum.
- Cartes : fond blanc casse en light, fond vert noirci en dark, bordures visibles.
- Formulaires : champs bien detaches dans les deux themes, focus tres lisible.
- Menu mobile : panneau institutionnel premium, avec variante claire et sombre.
- Fonds topographiques : lignes vertes discretes en light, lignes lumineuses mais
  faibles en dark.
- Cartes d'implantation : marqueurs visibles, couleurs de regions adaptees par theme.
- RTL arabe : memes tokens, mais alignements, entrees et icones directionnelles adaptes.

## Typographies

- Francais : `Inter`, `system-ui`, sans-serif.
- Arabe : `IBM Plex Sans Arabic`, `Noto Kufi Arabic`, `Cairo`, sans-serif.

## UI

- Boutons primaires : vert territoire, texte clair, rayon modere.
- Boutons secondaires : bordure anthracite ou verte, fond transparent.
- Cartes : fond blanc casse, bordure fine, ombre douce, rayon 8px maximum.
- Sections : alternance blanc casse, vert profond, fonds cartographiques subtils.
- Fonds : lignes topographiques SVG, grille territoriale, traces de bassins versants.

## Mobile

- Navigation plein ecran premium.
- Grilles simplifiees en une colonne.
- Chiffres cles en deux colonnes compactes.
- Carte d'implantation accompagnee d'une liste accessible.
- Boutons et zones tactiles de 44 px minimum.

## Animation

- Hero : photo reelle + lignes topographiques animees.
- Carte : marqueurs pulses, lignes territoriales tracees.
- Chiffres : compteurs animes au scroll.
- Timeline : horizontale desktop, verticale mobile.
- RTL : sens des entrees inverse en arabe.
- Accessibilite : respecter `prefers-reduced-motion`.
- Themes : adapter opacites, lueurs, fonds et contrastes selon light / dark.
