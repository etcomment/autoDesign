# Système de Templates — Documentation globale

Le système de templates d'autoDesign fournit **18 diagrammes structurés prêts à l'emploi**. Chaque template est un composant React qui s'affiche dans le Canvas SVG aux côtés des diagrammes Mermaid. Les templates exposent des éléments interactifs (drag, resize, sélection de couleur) via un store Zustand partagé.

---

## Liste complète des 18 templates

| # | Type | Label | Catégorie | Composant |
|---|---|---|---|---|
| 1 | `roadmap` | Roadmap | Roadmaps | `RoadmapTemplate` |
| 2 | `productRoadmap` | Product Roadmap | Roadmaps | `ProductRoadmapTemplate` |
| 3 | `strategy` | Strategy | Strategy | `StrategyTemplate` |
| 4 | `process` | Process | Process | `ProcessTemplate` |
| 5 | `puzzle` | Puzzle | Business | `PuzzleTemplate` |
| 6 | `funnel` | Funnel | Business | `FunnelTemplate` |
| 7 | `iceberg` | Iceberg | Business | `IcebergTemplate` |
| 8 | `dashboard` | Dashboard | Dashboard | `DashboardTemplate` |
| 9 | `table` | Table | Tables | `TableTemplate` |
| 10 | `agenda` | Agenda | Agendas | `AgendaTemplate` |
| 11 | `comparison` | Comparison | Comparisons | `ComparisonTemplate` |
| 12 | `brain` | Brain | Brains | `BrainTemplate` |
| 13 | `budget` | Budget | Budgets | `BudgetTemplate` |
| 14 | `business` | Business | Business | `BusinessTemplate` |
| 15 | `decisionTree` | Decision Tree | Decision trees | `DecisionTreeTemplate` |
| 16 | `goals` | Goals | Goals | `GoalsTemplate` |
| 17 | `manufacturing` | Manufacturing | Manufacturing | `ManufacturingTemplate` |
| 18 | `valueChain` | Value Chain | Value Chain | `ValueChainTemplate` |

---

## Structure des fichiers

```
src/templates/
├── types.ts                        # Tous les types de données (18 interfaces + union)
├── registry.ts                     # Registre : définitions + données par défaut (18 templates)
├── store.ts                        # Zustand store (useTemplateStore)
├── TemplateRenderer.tsx            # Routeur : sélectionne le composant selon le type actif
├── dsl/
│   └── parseTemplate.ts            # Parser DSL (@roadmap → RoadmapData/ProductRoadmapData)
├── panels/
│   ├── TemplatePanel.tsx            # Panneau de sélection des templates (gauche)
│   ├── TemplatePropertiesPanel.tsx  # Panneau de propriétés (couleurs, titre, description)
│   └── TemplateDslEditor.tsx        # Éditeur DSL textuel pour les roadmaps
├── shared/
│   ├── useTemplateDragResize.tsx    # Hook drag/resize générique (tous les templates)
│   ├── primitives.tsx               # Composants SVG réutilisables (Arrow, ChevronArrow, CircleBadge, CurvedPath)
│   └── icons.tsx                    # 49 icônes SVG + registre TEMPLATE_ICONS
└── components/
    ├── RoadmapTemplate.tsx          # Template Roadmap (timeline horizontale)
    ├── ProductRoadmapTemplate.tsx   # Template Product Roadmap (grille quarters × lanes)
    ├── StrategyTemplate.tsx         # Template Strategy
    ├── ProcessTemplate.tsx          # Template Process
    ├── PuzzleTemplate.tsx           # Template Puzzle
    ├── FunnelTemplate.tsx           # Template Funnel
    ├── IcebergTemplate.tsx          # Template Iceberg
    ├── DashboardTemplate.tsx        # Template Dashboard
    ├── TableTemplate.tsx            # Template Table
    ├── AgendaTemplate.tsx           # Template Agenda
    ├── ComparisonTemplate.tsx       # Template Comparison
    ├── BrainTemplate.tsx            # Template Brain
    ├── BudgetTemplate.tsx           # Template Budget
    ├── BusinessTemplate.tsx         # Template Business
    ├── DecisionTreeTemplate.tsx     # Template Decision Tree
    ├── GoalsTemplate.tsx            # Template Goals
    ├── ManufacturingTemplate.tsx    # Template Manufacturing
    └── ValueChainTemplate.tsx       # Template Value Chain
```

---

## Store (`useTemplateStore`)

`src/templates/store.ts` (107 lignes) — Un store Zustand avec immer (via `create`) qui centralise l'état de tous les templates.

### État

| Champ | Type | Description |
|---|---|---|
| `activeTemplate` | `TemplateType \| null` | Type du template actuellement affiché, ou `null` |
| `templateData` | `TemplateData \| null` | Données du template actif (selon son type) |
| `selectedTemplateElementIds` | `ReadonlySet<string>` | IDs des éléments sélectionnés (clic) |
| `templateElementColors` | `Record<string, string>` | Couleurs de remplissage par ID d'élément |
| `templateStrokeColors` | `Record<string, string>` | Couleurs de bordure par ID d'élément |
| `templateElementPositions` | `Record<string, {x, y, width, height}>` | Positions et tailles par ID d'élément |

### Actions

| Action | Description |
|---|---|
| `selectTemplate(type)` | Active un template avec ses données par défaut |
| `selectTemplateWithData(type, data)` | Active un template avec des données personnalisées (utilisé par le DSL) |
| `clearTemplate()` | Désactive le template courant |
| `updateTemplateData(data)` | Met à jour les données du template (ex: depuis le panneau de propriétés) |
| `toggleTemplateElement(id)` | Ajoute/retire un élément de la sélection |
| `updateTemplateColor(id, color)` | Change la couleur de remplissage d'un élément |
| `updateTemplateStrokeColor(id, color)` | Change la couleur de bordure d'un élément |
| `moveTemplateElement(id, pos)` | Déplace un élément |
| `resizeTemplateElement(id, size)` | Redimensionne un élément |

### Cycle de vie

```
selectTemplate(type)
    │
    ├── Cherche la définition dans le registry (getTemplateByType)
    ├── Stocke defaultData dans templateData
    ├── Réinitialise : selectedIds = Set(), colors = {}, strokeColors = {}, positions = {}
    └── TemplateRenderer réagit au changement de activeTemplate
            │
            ├── Sélectionne le composant via TEMPLATE_MAP
            └── Rendu du template
                    │
                    ├── useEffect initialise les positions dans templateElementPositions
                    ├── L'utilisateur interagit (drag, clic, couleurs...)
                    └── clearTemplate() → retour à null, le template disparaît
```

---

## Système de panneaux

Le système de templates s'intègre dans l'interface via 3 panneaux :

### TemplatePanel (gauche)

`src/templates/panels/TemplatePanel.tsx` — 227 lignes

- Affiche les catégories de templates (pliable/dépliable)
- Chaque template est un bouton qui appelle `selectTemplate(type)`
- Le template actif est mis en évidence visuellement
- Bouton "Browse Icons" pour explorer les 49 icônes disponibles
- Bouton "Clear" pour désactiver le template courant

### TemplatePropertiesPanel (droite)

`src/templates/panels/TemplatePropertiesPanel.tsx` — 271 lignes

- N'apparaît que si au moins un élément est sélectionné
- Affiche le label de l'élément sélectionné (ex: "Milestone: 2")
- Permet de modifier le titre et la description de l'élément (si applicable)
- Grille de 22 couleurs prédéfinies pour le fill
- Grille de 22 couleurs prédéfinies pour le stroke
- Color picker natif pour des couleurs personnalisées
- Support multi-sélection : applique le changement à tous les éléments sélectionnés

### TemplateDslEditor (bas du panneau gauche)

`src/templates/panels/TemplateDslEditor.tsx` — 99 lignes

- Zone de texte monospace pour saisir le DSL
- Exemple pré-rempli
- Bouton "Parse & Render"
- Aide intégrée listant les commandes disponibles
- Voir [Template DSL](./TEMPLATE_DSL.md) pour la syntaxe complète

---

## Composants partagés (shared/)

### Primitives SVG (`primitives.tsx`)

Composants React SVG réutilisables par tous les templates :

| Composant | Usage |
|---|---|
| `Arrow` | Flèche avec ligne, pointe triangulaire. Options : `dashed`, `thick`, `color` |
| `ChevronArrow` | Bloc en forme de flèche/chevron (utilisé entre milestones roadmap) |
| `CircleBadge` | Cercle avec numéro (utilisé sur la timeline roadmap) |
| `CurvedPath` | Chemin courbe passant par des points (courbes de Bézier quadratiques) |

### Icônes (`icons.tsx`)

49 icônes SVG organisées par catégories :

| Catégorie | Icônes |
|---|---|
| Général | user, chart, gear, target, lightbulb, flag, star, check, arrowUp, arrowDown |
| Communication | mail, phone, chat, globe, wifi, bluetooth |
| Business/Finance | dollar, euro, creditCard, wallet, pieChart, barChart, lineChart |
| Technologie | laptop, mobile, tablet, cloud, database, code, shield, key, mapPin |
| People/RH | people, handshake, trophy, badge, award |
| Office/Documents | file, folder, clipboard, calendar, clock |
| Transport/Logistique | truck, plane, ship, package |
| Environnement | leaf, tree, recycle, waterDrop |

Toutes les icônes sont enregistrées dans `TEMPLATE_ICONS` pour l'explorateur intégré au `TemplatePanel`.

### Hook drag/resize (`useTemplateDragResize.tsx`)

Hook React partagé par tous les templates. Voir la [documentation du template Roadmap](./ROADMAP_TEMPLATE.md#système-de-dragresize-usetemplatedragresize) pour le détail complet.

---

## Comment ajouter un nouveau template

### Étape 1 — Définir le type de données

Dans `src/templates/types.ts`, ajouter l'interface de données du template et l'ajouter à l'union `TemplateData` :

```typescript
// 1. Définir les interfaces nécessaires
export interface MonTemplateItem {
  title: string
  subtitle?: string
  valeur?: number
}

export interface MonTemplateData {
  type: 'monTemplate'           // identifiant unique
  title?: string
  items: MonTemplateItem[]
}

// 2. Ajouter à l'union TemplateData
export type TemplateData =
  | RoadmapData
  | ProductRoadmapData
  // ... autres types existants
  | MonTemplateData             // ← ajouter ici

// 3. Le type est automatiquement inclus dans TemplateType
```

### Étape 2 — Ajouter la définition dans le registre

Dans `src/templates/registry.ts`, ajouter une entrée dans le tableau `TEMPLATES` :

```typescript
{
  type: 'monTemplate',
  label: 'Mon Template',
  category: 'Ma Catégorie',    // apparaît comme groupe dans le panneau
  defaultData: {
    type: 'monTemplate',
    items: [
      { title: 'Item 1', subtitle: 'Description', valeur: 42 },
      { title: 'Item 2', subtitle: 'Description', valeur: 100 },
    ],
  },
}
```

### Étape 3 — Créer le composant

Créer `src/templates/components/MonTemplate.tsx` :

```typescript
import { useRef, type ReactElement } from 'react'
import type { MonTemplateData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function MonTemplate({ data }: { data: MonTemplateData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, items } = data
  const W = 800, H = 500

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontSize={22} fontWeight={700}>
          {title}
        </text>
      )}
      {items.map((item, index) => {
        const elementId = `item-${index}`
        const color = tplColors[elementId] ?? '#4a90d9'
        const isSelected = selectedIds.has(elementId)
        const rect = { x: 100 + index * 150, y: 150, width: 120, height: 80 }
        return (
          <g key={index} onMouseDown={e => startDrag(e, elementId, rect)}
             style={{ cursor: 'pointer' }}>
            <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height}
                  rx={6} fill={color} stroke={tplStrokeColors[elementId] || color}
                  strokeWidth={isSelected ? 2.5 : 1} />
            <text x={rect.x + rect.width / 2} y={rect.y + rect.height / 2}
                  textAnchor="middle" fontSize={12} fill="white">{item.title}</text>
            {isSelected && renderHandles(rect, elementId)}
          </g>
        )
      })}
    </g>
  )
}
```

Points importants :
- Toujours wrapper dans `<g ref={svgRef}>` pour que le hook drag/resize fonctionne
- Ajouter un fond blanc (`<rect>`) pour que l'export PNG/PPTX ait un fond
- Utiliser `elementId` au format `prefix-index` (ex: `item-0`, `item-1`)
- Enregistrer le préfixe dans `collectionKeys` et `labels` de `TemplatePropertiesPanel` si applicable

### Étape 4 — Enregistrer dans le renderer

Dans `src/templates/TemplateRenderer.tsx` :

```typescript
// 1. Importer le composant
import { MonTemplate } from './components/MonTemplate'

// 2. Ajouter l'entrée dans TEMPLATE_MAP
const TEMPLATE_MAP: Record<TemplateType, TemplateComponent> = {
  // ... autres entrées
  monTemplate: ({ data }) => <MonTemplate data={data as MonTemplateData} />,
}
```

Le template est maintenant disponible dans l'interface.

---

## Coexistence avec les diagrammes Mermaid

Les templates et les diagrammes Mermaid partagent le même Canvas SVG mais fonctionnent de manière indépendante :

1. **Isolation du store** : `useTemplateStore` est distinct du store des diagrammes (`useDiagramStore`). Les deux ne partagent pas d'état.

2. **Rendu SVG** : le `TemplateRenderer` est wrappé dans `<g pointerEvents="all">`, ce qui lui permet de capturer les événements de souris sans interférer avec les autres calques SVG.

3. **Pas d'interopérabilité** : un élément de template ne peut pas être connecté à un nœud Mermaid. Les deux systèmes coexistent visuellement dans le même espace mais sont conceptuellement séparés.

4. **Export** : lors de l'export (SVG, PNG, PPTX), le template et les diagrammes Mermaid sont rendus ensemble dans la même image.

5. **Sélection** : cliquer sur un élément de template le sélectionne dans le store de templates (`toggleTemplateElement`). Cliquer sur un nœud Mermaid le sélectionne dans le store de diagrammes. Les deux sélections peuvent coexister.

---

## Voir aussi

- [Template DSL — Syntaxe et Architecture](./TEMPLATE_DSL.md)
- [Documentation du Template Roadmap](./ROADMAP_TEMPLATE.md)
