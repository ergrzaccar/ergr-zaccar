# Strategie theme light / dark

## Objectif

ERGR Zaccar doit avoir deux identites visuelles completes :

- Light mode : institutionnel, clair, administratif, ecologique, premium.
- Dark mode : profond, cartographique, technique, premium, sans effet futuriste excessif.

Le dark mode ne doit pas etre une inversion automatique des couleurs.

## Etats du selecteur

Le bouton de theme dans le Header aura trois etats :

- Systeme
- Clair
- Sombre

Comportement recommande :

- `system` suit `prefers-color-scheme`.
- `light` force le theme clair.
- `dark` force le theme sombre.
- Le choix utilisateur est sauvegarde dans `localStorage`.
- Cle recommandee : `ergr-zaccar-theme`.
- Attribut DOM recommande : `data-theme="light"` ou `data-theme="dark"` sur
  `document.documentElement`.

## Accessibilite

- Le controle de theme doit etre utilisable au clavier.
- Le libelle doit etre explicite pour les lecteurs d'ecran.
- Les icones seules doivent avoir un `aria-label` clair.
- Le focus doit etre visible dans les deux modes.
- Le contraste texte / fond doit rester suffisant sur mobile et desktop.
- Les couleurs ne doivent pas etre le seul moyen de comprendre un etat.

## RTL / langues

Le theme doit fonctionner avec :

- francais + light ;
- francais + dark ;
- arabe RTL + light ;
- arabe RTL + dark.

En arabe :

- les animations d'entree horizontales sont inversees ;
- les icones directionnelles doivent etre miroir si necessaire ;
- le menu mobile part naturellement du cote logique RTL ;
- le selecteur de theme garde le meme comportement mais l'ordre visuel peut etre adapte.

## Tokens par famille

Les composants ne doivent pas utiliser directement des hex codes disperses. Ils doivent
consommer des tokens CSS :

- surfaces : page, section, elevated, overlay ;
- textes : primary, secondary, muted, inverse ;
- borders : subtle, strong, focus ;
- brand : primary, secondary, accent ;
- status : success, warning, danger, info ;
- maps : land, water, route, marker, contour ;
- shadows : soft, elevated, floating ;
- motion : duration, easing, reduced.

## Impact composants

- Header : logo, navigation, selecteurs langue/theme, contraste scroll.
- Mobile menu : panneau premium adapte au theme, overlay non agressif.
- Hero : photo + filtre different selon theme pour garder lisibilite.
- Cartes : elevation douce en light, contours plus nets en dark.
- Boutons : primaire vert profond en light, vert clair ou dore discret en dark.
- Formulaires : champs lisibles, placeholders sobres, erreurs visibles.
- Carte d'implantation : couleurs des regions et marqueurs adaptees.
- Timeline : ligne principale lisible, jalons contrastes.
- Chiffres cles : valeurs tres lisibles, unite et label secondaires.

## Animation par theme

- Light : topographie fine, ombres douces, transitions sobres.
- Dark : lignes topographiques plus lumineuses mais faibles, halos limites.
- Les transitions de theme doivent etre courtes et non perturbantes.
- `prefers-reduced-motion` desactive les mouvements longs, parallax, compteurs animes
  et transitions complexes.

## Tests a prevoir

- Persistance `localStorage`.
- Detection `prefers-color-scheme`.
- Bascule systeme vers clair / sombre.
- Matrice FR / AR x light / dark.
- Contrastes principaux.
- Focus clavier dans le Header et le menu mobile.
