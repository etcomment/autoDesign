# Règles et Prérequis pour le Développement de Templates (autoDesign)

Ce document centralise toutes les contraintes, règles et attentes pour le
développement, la création ou la modification d'un template dans l'application
autoDesign. Tout Agent IA ou développeur **doit impérativement** respecter ces
directives.

- - -
## ⚠️ RÈGLE ABSOLUE ET PRIORITAIRE : PAS DE TITRE, PAS D'ENTÊTE, PAS DE FOND BLANC

* **Transparence totale** : NE JAMAIS ajouter de `\<rect width={W} height={H}
  fill="white" />` en fond de template. Les templates doivent être 100%
  transparents.
* **Pas d'en-tête ni de titre** : NE JAMAIS ajouter de titres par défaut,
  d'en-têtes ("Brain 1 Template", "Roadmap Title", etc.), de pieds de page ou
  de logos. Le template contient UNIQUEMENT le diagramme visuel pur et ses
  cartes/jalons/callouts.

- - -
## 1\. Interactivité Totale (Drag & Resize)

Aucun élément visuel du diagramme ne doit être statique. Chaque nœud, carte,
jalon ou composant généré par le DSL doit être interactif.

* **Référence SVG** : Le composant global doit encapsuler son rendu dans un `\<g
  ref={svgRef}>`.
* **Hook d'interaction** : Utiliser `const { startDrag, renderHandles } =
  useTemplateDragResize(svgRef)`.
* **ID Unique** : Chaque élément interactif doit avoir un identifiant unique (ex: `
  milestone-0`, `card-1`).
* **Sélection & Drag** : Ajouter l'événement sur le groupe de l'élément : `\<g
  onMouseDown={e => startDrag(e, elementId, rect)} style={{ cursor: 'pointer'
  }}>`
* **Mise en évidence (Sélection)** : Vérifier si l'élément est sélectionné (`
  selectedIds.has(elementId)`) et modifier son apparence (ex: `
  strokeWidth={isSelected ? 2.5 : 0}`).
* **Poignées de redimensionnement** : Toujours appeler `{isSelected &&
  renderHandles(rect, elementId)}` à l'intérieur du groupe de l'élément pour
  afficher les contrôles.

## 2\. Élasticité et Connecteurs Dynamiques

Si des éléments sont reliés par des lignes, flèches ou des chemins SVG :

* **Pas de coordonnées en dur (hardcodées)** pour les connecteurs.
* **Lecture en temps réel** : Les lignes doivent calculer leurs points de départ
  et d'arrivée en fonction des coordonnées dynamiques des éléments qu'elles
  relient (récupérées via `templateElementPositions` depuis le store).
* **Suivi au mouvement** : Quand un utilisateur déplace une carte, le connecteur
  qui lui est rattaché doit s'étirer ou se réduire automatiquement.

## 3\. Positionnement et Stockage (Store Zustand)

Les éléments ne doivent pas réinitialiser leur position au re-render s'ils ont
été bougés.

* **Layout dynamique (Initialisation)** : Le template calcule les positions
  initiales en fonction du nombre d'éléments à afficher.
* **Priorité au Store** : Avant de rendre l'élément à sa position "par défaut",
  le template doit toujours vérifier si des coordonnées personnalisées existent
  dans le store : `const pos = templateElementPositions\[elementId] ||
  calculInitial`
* Le pattern standard consiste à utiliser une fonction `getRect(id, ...)` ou un
  helper pour fusionner les dimensions stockées avec celles du layout par
  défaut.

## 4\. Adaptation au Nombre d'Éléments ("N éléments")

Le template ne doit pas se casser si le DSL lui passe plus ou moins d'éléments
que prévu.

* **Calcul d'espace dynamique** : Diviser dynamiquement l'espace (largeur ou
  hauteur) par `items.length`.
* **Coupe-circuit de sécurité** : Si le design physique ne permet pas plus d'un
  certain nombre d'éléments, tronquer proprement ou utiliser un `
  Math.min(items.length, MAX_CAPACITY)`.

## 5\. Gestion des Couleurs et de la Palette (Thème MIGSO)

La hiérarchie des couleurs (du plus prioritaire au moins prioritaire) doit être
strictement appliquée :

1.  **Couleur de l'UI** : Modifiée par l'utilisateur via le panel (`
    templateElementColors\[elementId]`).
2.  **Couleur du DSL** : Précisée en dur dans le code DSL par l'utilisateur (via `
    .style.fill` ou `.color`).
3.  **Palette par défaut (MIGSO)** : Utiliser cycliquement la palette
    d'entreprise importée depuis `theme.ts` (`MIGSO_PALETTE\[index %
    MIGSO_PALETTE.length]`).

## 6\. Fidélité au DSL (Domain Specific Language)

Tous les attributs extraits du parser DSL doivent avoir une représentation
visuelle dans le template (sauf si le design justifie de les ignorer
explicitement) :

* `title` et `subtitle` des éléments/cartes (et non de la slide entière).
* `val` (Valeur numérique/texte) et `pct` (Pourcentage).
* `icon` (Utiliser l'intégration avec `TEMPLATE_ICONS` / `Lucide`).
* `date` (Essentiel pour le positionnement ou le label temporel dans les
  Roadmaps).

### 6.1 Retour à la ligne du texte

Toujours s'assurer que le retour à la ligne est géré dans les **titres de
blocs** et dans **les textes/descriptions** (`title`, `subtitle`, libellés des
cartes, jalons, etc.).

* **Wrapping par largeur** : Ne jamais tronquer brutalement avec `.slice()` qui
  coupe du texte, ni laisser le texte déborder hors de la carte. Utiliser le
  helper `wrapTextByWidth(text, maxCharsParLigne)` de `shared/primitives.tsx`
  pour découper le texte en lignes adaptées à la largeur de l'élément.
* **Rendu multi-lignes** : Rendre les lignes produites en `<tspan>` avec `x`
  partagé et `dy={ligneIndex === 0 ? 0 : <hauteurLigne>}` afin que le texte
  passe correctement à la ligne.
* **`maxCharsParLigne` dynamique** : Calculer la capacité de caractères à
  partir de la largeur du bloc (ex : `Math.max(10, Math.floor(bbox.width /
  6.5))`) pour que le wrapping s'adapte au redimensionnement.
* **Sauts de ligne explicites** : Préserver aussi les `\n` explicites présents
  dans le contenu (le parser convertit `\n` en vrai saut de ligne via
  `stripQuotes`).

### 6.2 Accrochage Temporel & Quarters (`quarters`, `date:`)

* **Axe temporel unifié** : Les templates de type Roadmap (`Roadmap 3`, `Roadmap 5`, etc.) utilisent la directive `quarters <an1> <an2> ...` pour définir les points d'ancrage de la timeline.
* **Déduction automatique** : Si `quarters` n'est pas fourni, le template déduit dynamiquement la liste des dates depuis les attributs `date:` des jalons (+ l'étape terminale).
* **Accrochage par `date:`** : Chaque jalon avec `date:<année>` vient se positionner et s'accrocher au point d'année correspondant. Le jalon sans `date:` s'accroche au marqueur `START`.

### 6.3 Progression & Coloration des Segments (`progress`, `current`, `track`)

* **Étape actuelle** : La directive `progress <année|index>` ou `current <année>` définit jusqu'où la timeline est avancée.
* **Segments dynamiques** : Les segments horizontaux de la timeline s'activent et héritent de la couleur du jalon d'origine de chaque segment (ou de `track`). Les segments futurs restent en gris clair inactif (`#d9dee4`).
* **Héritage sur quarters vides** : Les points/quarters sans jalon propre héritent automatiquement de la couleur du jalon qui les précède.

