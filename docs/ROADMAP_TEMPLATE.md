# Documentation du Template Roadmap

Le template Roadmap existe sous deux variantes : **Roadmap simple** (timeline horizontale) et **Product Roadmap** (grille trimestres × équipes). Les deux partagent les mêmes mécanismes de drag/resize, de couleurs et d'interaction avec le store.

---

## Modèle de données

### `TemplateMilestone` — L'unité de base

```typescript
interface TemplateMilestone {
  title: string
  subtitle?: string
  quarter?: string      // utilisé en Product Roadmap (colonne)
  lane?: string         // utilisé en Product Roadmap (ligne)
  date?: string         // date/année/mois libre — utilisé par Roadmap 1-16
  style?: TemplateElementStyle
  color?: string
  icon?: string
  value?: string        // DSL: val:
  percent?: string      // DSL: pct:
}
```

### `TemplateElementStyle` — Contrôle visuel

```typescript
interface TemplateElementStyle {
  boxWidth?: number
  boxHeight?: number
  fontSize?: number
  fontWeight?: number
  fontColor?: string
  fill?: string
  stroke?: string
}
```

### `TemplateQuarter` et `TemplateLane`

```typescript
interface TemplateQuarter {
  label: string    // ex: "Q1"
  year?: string    // ex: "2026"
}

interface TemplateLane {
  label: string    // ex: "Development"
}
```

### `RoadmapData` — Mode Simple

```typescript
interface RoadmapData {
  type: 'roadmap'
  title?: string
  milestones: TemplateMilestone[]
  quarters?: TemplateQuarter[]
  lanes?: TemplateLane[]
  startLabel?: string           // défaut: "START"
  finishLabel?: string          // défaut: "FINISH"
  defaultStyle?: TemplateElementStyle
}
```

### `ProductRoadmapData` — Mode Grid

```typescript
interface ProductRoadmapData {
  type: 'productRoadmap'
  title?: string
  quarters: TemplateQuarter[]
  lanes: TemplateLane[]
  milestones: TemplateMilestone[]   // chaque milestone doit avoir quarter et lane
}
```

---

## Architecture des composants

### `RoadmapTemplate.tsx` (Roadmap 1)

Le composant `RoadmapTemplate` affiche une **timeline horizontale** avec des milestones positionnés alternativement au-dessus et en-dessous.

**Structure visuelle** :
```
    ┌─────────┐              ┌─────────┐
    │ Alpha   │              │ RC1     │
    │ Tests   │              │ Release │
    └────┬────┘              └────┬────┘
         │                       │
  START ─●───▶───▶──▶───●───▶───▶───●──── FINISH
                   │                       │
              ┌────┴────┐             ┌────┴────┐
              │ Beta    │             │ GA      │
              │ Early   │             │ Go live │
              └─────────┘             └─────────┘
```

**Éléments SVG** :
- Un fond blanc (`<rect>`) de 1000×600
- Un titre centré en haut
- Une ligne de timeline (`<line>`) horizontale
- Un cercle de départ (`start-circle`) et d'arrivée (`finish-circle`)
- Des labels de début (`start-label`) et de fin (`finish-label`)
- Pour chaque milestone :
  - Un bloc rectangulaire avec header coloré et titre/subtitle
  - Un cercle numéroté (`CircleBadge`)
  - Une ligne verticale reliant le cercle à la timeline
  - Entre deux milestones consécutifs : un chevron (`ChevronArrow`)

### `ProductRoadmapTemplate.tsx` (Product Roadmap)

Le composant `ProductRoadmapTemplate` affiche une **grille** quarters × lanes avec des badges colorés dans les cellules.

**Structure visuelle** :
```
           Q1 2026       Q2 2026       Q3 2026       Q4 2026
        ┌───────────┬───────────┬───────────┬───────────┐
  Dev   │ ▎API v2   │           │           │ ▎Launch   │
        ├───────────┼───────────┼───────────┼───────────┤
  Product│           │ ▎Dashboard│           │           │
        ├───────────┼───────────┼───────────┼───────────┤
  UX    │           │           │ ▎Redesign │           │
        ├───────────┼───────────┼───────────┼───────────┤
  QA    │           │           │ ▎RC1      │           │
        └───────────┴───────────┴───────────┴───────────┘
```

**Éléments SVG** :
- Un fond blanc de 1000×600
- Un titre centré en haut
- Des en-têtes de colonnes (quarters) avec année optionnelle
- Des labels de lignes (lanes) à gauche
- Une grille de cellules avec bordures
- Pour chaque milestone : un badge avec barre colorée à gauche et titre

---

## Système de drag/resize : `useTemplateDragResize`

`src/templates/shared/useTemplateDragResize.tsx` (199 lignes)

C'est un hook React générique, partagé par tous les templates, qui gère le **drag** (déplacement) et le **resize** (redimensionnement) des éléments SVG.

### Mécanisme

1. **Attachement des événements** : au `mousedown` sur un élément, les événements `mousemove` et `mouseup` sont attachés à `window` (et non à l'élément) pour capturer le mouvement même si la souris sort de l'élément.

2. **Conversion en coordonnées SVG** : la méthode `toSvgPoint` utilise `getScreenCTM().inverse()` pour convertir les coordonnées écran (`clientX`, `clientY`) en coordonnées SVG.

3. **Seuil de drag** : un `DRAG_THRESHOLD` de 3 pixels évite de déclencher un drag lors d'un clic simple. Si la souris bouge de moins de 3px, le `mouseup` déclenche un `toggleElement` (sélection/déselection).

4. **Drag multi-sélection** : si plusieurs éléments sont sélectionnés et que l'utilisateur en drag un, tous les éléments sélectionnés sont déplacés ensemble. Leurs positions initiales sont capturées dans `allStartRects`.

5. **Contraintes de déplacement** :
   - `Shift` maintenu → déplacement vertical uniquement
   - `Ctrl`/`Cmd` maintenu → déplacement horizontal uniquement
   - Sans modifieur → déplacement libre

6. **Resize** : 4 coins (nw, ne, sw, se) avec des poignées carrées de 8×8px. Chaque coin ajuste le rectangle différemment.
   - `Shift` maintenu lors du resize → conserve le ratio d'aspect (width/height) de l'élément initial.
   - Taille minimale : `MIN_SIZE = 40px`

7. **Rotation** : Poignée circulaire reliée par une tige au-dessus du centre haut de la boîte de sélection.
   - Calcul dynamique de l'angle de rotation via `Math.atan2` par rapport au centre de l'élément/groupe.
   - Affichage d'un badge visuel des degrés (ex: `45°`) en cours de rotation.
   - Mémorisation de l'angle dans `templateElementRotations`.

8. **Groupement (`Ctrl+G` / `Ctrl+Shift+G`)** :
   - Regroupement dynamique de plusieurs éléments de template.
   - Bounding box commune calculée automatiquement englobant l'ensemble des membres du groupe.
   - Poignées de déplacement, redimensionnement et rotation appliquées simultanément au groupe avec synchronisation parfaite des trajectoires.

9. **Rendu des poignées** : `renderHandles` affiche les 4 poignées de coin ainsi que la tige et la poignée de rotation supérieure uniquement sur les éléments ou groupes sélectionnés.

---

## Système de couleurs

Les couleurs sont gérées par deux maps dans le store Zustand :

### `templateElementColors`

Un `Record<string, string>` qui associe un ID d'élément à sa **couleur de remplissage** (fill). Modifiable via `updateTemplateColor`.

### `templateStrokeColors`

Un `Record<string, string>` qui associe un ID d'élément à sa **couleur de bordure** (stroke). Modifiable via `updateTemplateStrokeColor`.

### Palette par défaut

Chaque template a une palette de couleurs pour les milestones sans couleur explicite :

**Roadmap simple** — `PALETTE` (8 couleurs) :
```typescript
['#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']
```

**Product Roadmap** — `PALETTE` (10 couleurs) :
```typescript
['#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']
```

### Résolution de couleur

Pour un milestone donné, la couleur est résolue dans cet ordre :
1. `templateElementColors[elementId]` (défini par l'utilisateur via le panneau de propriétés)
2. `milestone.style.fill` (défini dans les données, par exemple via le DSL)
3. `PALETTE[index % PALETTE.length]` (couleur cyclique par défaut)

---

## Gestion des positions

### Positionnement initial (layout)

Dans `RoadmapTemplate`, la fonction `useMemo` `layoutMap` calcule la position théorique de chaque milestone et de son cercle associé :

- **Espacement horizontal** : la largeur disponible (`W - marginX * 2`) est divisée par `milestones.length - 1` (ou par 2 s'il n'y a qu'un seul milestone)
- **Alternance haut/bas** : `index % 2 === 0` → au-dessus de la timeline, sinon en-dessous
- **Hauteur dynamique** : calculée en fonction du nombre de lignes du titre et du sous-titre, avec un minimum (`baselineRectH` = 95px)
- **Largeur** : `milestone.style.boxWidth` ou 140px par défaut

### Éléments gris (hors layout)

Une seconde map `greyDefaultPositions` calcule les positions par défaut des éléments statiques :
- `timeline-line` : ligne horizontale centrale
- `start-label`, `finish-label` : labels aux extrémités
- `start-circle`, `finish-circle` : cercles décoratifs
- `chevron-N` : flèches entre milestones

### Positions stockées

`useTemplateStore.templateElementPositions` est un `Record<string, {x, y, width, height}>` qui persiste les positions après drag/resize. La fonction `getRect` consulte d'abord cette map, puis le layout calculé :

```typescript
function getRect(elementId, positions, layoutMap, greyDefaultPositions): Rect {
  const stored = positions[elementId]
  if (elementId.startsWith('circle-')) {
    if (stored) return { x: stored.x, y: stored.y, width: 20, height: 20 }
    return { x: layout.centerX - 14, y: 260 - 14, width: 28, height: 28 }
  }
  if (stored) {
    return { x: stored.x, y: stored.y, width: stored.width || layout.rectW, height: max(stored.height, layout.rectH) }
  }
  return { x: layout.rectX, y: layout.rectY, width: layout.rectW, height: layout.rectH }
}
```

### Initialisation des positions

Un `useEffect` dans `RoadmapTemplate` initialise les positions au premier rendu :

```typescript
useEffect(() => {
  const ids = [...layoutMap.keys(), ...greyDefaultPositions.keys()]
  for (const id of ids) {
    if (templateElementPositions[id]) continue  // déjà positionné
    const rect = getRect(id, templateElementPositions, layoutMap, greyDefaultPositions)
    moveTemplateElement(id, { x: rect.x, y: rect.y })
    resizeTemplateElement(id, { width: rect.width, height: rect.height })
  }
}, [layoutMap, greyDefaultPositions, templateElementPositions, moveTemplateElement, resizeTemplateElement])
```

---

## Conventions d'IDs des éléments

Chaque élément SVG reçoit un ID unique qui détermine son comportement dans le store :

| Pattern d'ID | Élément | Template |
|---|---|---|
| `milestone-N` | Bloc de milestone (rect + texte) | Les deux |
| `circle-N` | Cercle numéroté sur la timeline | Roadmap 1 uniquement |
| `chevron-N` | Flèche entre milestones consécutifs | Roadmap 1 uniquement |
| `timeline-line` | Ligne horizontale de la timeline | Roadmap 1 uniquement |
| `start-label` | Label "START" | Roadmap 1/4/5/7/15/16 |
| `finish-label` | Label "FINISH" | Roadmap 1/4/5/7/15/16 |
| `start-circle` | Cercle de début | Roadmap 1 uniquement |
| `finish-circle` | Cercle de fin | Roadmap 1 uniquement |
| `dot-N` | Point de l'année sur la timeline | Roadmap 2/3 |
| `year-N` | Label d'année | Roadmap 2/3/5 |
| `card-N` | Carte de jalon | Roadmap 3/5 |
| `block-N` | Bloc coloré | Roadmap 6/8-16 |

L'index `N` correspond à la position du milestone dans le tableau `milestones`.

### Identification dans `TemplatePropertiesPanel`

Le panneau de propriétés décode le préfixe pour déterminer le type d'élément :

```typescript
const labels: Record<string, string> = {
  milestone: 'Milestone', circle: 'Circle', chevron: 'Chevron',
  timeline: 'Timeline', start: 'Start', finish: 'Finish',
  // ...
}
```

---

## Application des styles DSL aux éléments

Quand un milestone a un `style` dans ses données (qu'il provienne du DSL ou du registry), les propriétés sont appliquées directement dans le rendu :

```typescript
// Dans RoadmapTemplate :
const color = tplColors[elementId] ?? milestone.style?.fill ?? PALETTE[index % PALETTE.length]!
const styleFontSize = milestone.style?.fontSize ?? 12
const styleFontWeight = milestone.style?.fontWeight ?? 700
const styleFontColor = milestone.style?.fontColor ?? 'white'
const baseStroke = milestone.style?.stroke || color
const styleW = milestone.style?.boxWidth ?? rectW
const baseStyleH = milestone.style?.boxHeight ?? baselineRectH
```

Priorité : **couleur utilisateur > style DSL > palette par défaut**.

Dans `ProductRoadmapTemplate`, les `TemplateElementStyle` ne sont pas directement utilisés pour le rendu (pas de `style` lu depuis les milestones). Les couleurs viennent uniquement du store (`tplColors`) ou de la palette.

---

## Champ `date:` dans les templates Roadmap

Tous les templates Roadmap (1 à 16) supportent un champ `date?: string` sur chaque `TemplateMilestone`. Il est renseigné dans le DSL avec la syntaxe `date:<valeur>` et est conservé lors des cycles parse ↔ generate.

### Impact visuel par template

| Template | Usage de `date:` | Fallback sans `date:` |
|---|---|---|
| **Roadmap 1** | Label secondaire du jalon | *(aucun)* |
| **Roadmap 2** | Année de chaque point de la timeline | `2019`, `2020`… |
| **Roadmap 3** | Positionne la carte sur la bonne année | Indices 2 et 7 de la liste |
| **Roadmap 5** | Année sous chaque tige | `2019`–`2022` |
| **Roadmap 7** | Label gauche de la timeline verticale | *(aucun)* |
| **Roadmap 8 & 9** | Année au-dessus de chaque colonne | `2019 + i` |
| **Roadmap 10** | Label sous le titre dans le bloc | *(aucun)* |
| **Roadmap 11** | Grand label latéral (remplace numéro) | `1`, `2`… |
| **Roadmap 12** | Remplace le label `Step 01` | `Step 01`, `Step 02`… |
| **Roadmap 13** | Remplace le label `WEEK 1` | `WEEK 1`, `WEEK 2`… |
| **Roadmap 14** | Année au-dessus de la flèche | `2019 + i` |
| **Roadmap 15** | Grand chiffre fond + label bas | `01`, `02`… |
| **Roadmap 16** | Label sous le subtitle du cercle | *(aucun)* |

### Interaction avec `quarters`

Pour **Roadmap 2**, la liste des années de la timeline peut être définie par :
1. Le champ `date:` de chaque milestone (`milestone "…" "…" date:2025`)
2. La directive `quarters` (`quarters 2022 2023 2024 2025`)
3. Fallback automatique : `['2019'…'2028']`

Pour **Roadmap 3**, `quarters` définit la **liste des points de la timeline**, et `date:` de chaque milestone détermine sur quel point chaque carte doit s'accrocher.
