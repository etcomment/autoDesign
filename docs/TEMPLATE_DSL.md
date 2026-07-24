# Template DSL — Syntaxe et Architecture

Le **Template DSL** (Domain Specific Language) permet de décrire textuellement un template Roadmap et de l'afficher instantanément dans l'éditeur. C'est une syntaxe légère et lisible, conçue pour être saisie rapidement sans passer par l'interface graphique complète.

---

## Référence de syntaxe

### La commande `@roadmap`

Tout script DSL commence obligatoirement par `@roadmap`, suivi optionnellement d'un titre entre guillemets :

```
@roadmap "Titre de la roadmap"
```

Les lignes vides et les commentaires `// ...` sont ignorés par le parser.

### Les sous-commandes

| Commande | Description |
|---|---|
| `start "..."` | Label de l'extrémité gauche de la timeline (par défaut `START`) |
| `finish "..."` | Label de l'extrémité droite de la timeline (par défaut `FINISH`) |
| `quarters Q1 Q2 Q3 Q4` | Déclenche le **mode Grid** (Product Roadmap) et définit les colonnes |
| `lanes Dev UX QA` | Définit les lignes du mode Grid (utilisé uniquement avec `quarters`) |
| `milestone "Titre" "Description"` | Déclare un milestone. Optionnellement préfixé par `quarter:lane` |
| `style propriété valeur` | Définit un style pour le milestone en cours ou un style global |

### Mode Simple vs Mode Grid

**Mode Simple** — Quand `quarters` et `lanes` ne sont pas spécifiés, le parser produit un `RoadmapData` (type `roadmap`). Les milestones s'affichent sur une timeline horizontale, alternativement au-dessus et en-dessous.

**Mode Grid** — Quand `quarters` et/ou `lanes` sont présents, le parser produit un `ProductRoadmapData` (type `productRoadmap`). Les milestones sont positionnés dans une grille trimestres x lanes.

### Syntaxe des milestones

```
milestone "Titre" "Description optionnelle"
```

En mode Grid, on préfixe par le quarter et la lane :

```
milestone Q1:Development "Alpha" "Version interne"
milestone Q2:Product "Beta" "Early access"
milestone Q3:QA "RC1" "Release candidate"
```

### Directives `style`

La directive `style` modifie l'apparence visuelle des éléments. Elle accepte les propriétés suivantes :

| Propriété | Type | Description | Exemple |
|---|---|---|---|
| `boxWidth` | nombre | Largeur du bloc milestone en pixels | `style boxWidth 180` |
| `boxHeight` | nombre | Hauteur minimale du bloc milestone en pixels | `style boxHeight 100` |
| `fontSize` | nombre | Taille de police du titre (px) | `style fontSize 14` |
| `fontWeight` | nombre | Graisse de la police (400, 600, 700, etc.) | `style fontWeight 600` |
| `fontColor` | string | Couleur du texte (nom CSS ou hex) | `style fontColor white` |
| `fill` | string | Couleur de fond du bloc milestone | `style fill #4a90d9` |
| `stroke` | string | Couleur de bordure du bloc milestone | `style stroke #333` |

### Styles globaux vs styles par milestone

**Style global** : une directive `style` placée avant le premier `milestone` s'applique à tous les milestones (sauf ceux qui ont leur propre style).

```
@roadmap "Plan"
  style boxWidth 150       ← s'applique à tous
  style fontSize 13

  milestone "Étape 1"
  milestone "Étape 2"
```

**Style par milestone** : une directive `style` placée directement après un `milestone` s'applique uniquement à ce milestone et **remplace** le style global pour cette propriété.

```
  milestone "Étape 1"
    style fill #e74c3c     ← uniquement Étape 1
    style boxWidth 200

  milestone "Étape 2"     ← utilise les styles globaux
```

### Sauts de ligne

Utilisez `\n` dans les chaînes entre guillemets pour insérer des sauts de ligne :

```
milestone "Alpha" "Phase 1\nTests internes"
```

Le parser convertit `\n` littéral en vrai saut de ligne via `stripQuotes`.

---

## Exemples complets

### Exemple 1 : Roadmap simple (mode timeline)

```
@roadmap "Lancement Produit"
  start "Kickoff"
  finish "GA Release"

  style boxWidth 150
  style fontSize 13

  milestone "Alpha" "Tests internes\nphase 1/2"
    style fill #4a90d9

  milestone "Beta" "Early access"
    style fill #2ecc71
    style boxWidth 180

  milestone "RC1" "Release candidate"

  milestone "GA" "Go live"
```

Résultat : 4 milestones sur une timeline horizontale, Alpha et RC1 au-dessus, Beta et GA en-dessous. Alpha et Beta ont des couleurs personnalisées.

### Exemple 2 : Product Roadmap (mode grid)

```
@roadmap "Roadmap 2026"
  quarters Q1 Q2 Q3 Q4
  lanes Development Product UX QA

  milestone Q1:Development "API v2"
  milestone Q2:Product "Dashboard"
  milestone Q3:UX "Redesign"
  milestone Q4:QA "Test suite"
```

Résultat : une grille 4x4 avec les milestones positionnés dans les cellules correspondantes.

### Exemple 3 : Styles globaux sur Product Roadmap

```
@roadmap "Tech Roadmap"
  quarters Q1 Q2
  lanes Backend Frontend

  style fontSize 11
  style fontWeight 600

  milestone Q1:Backend "Auth Service"
    style fill #4caf50

  milestone Q2:Frontend "UI Kit"
    style fill #2196f3
```

---

## Architecture du parser

### Fichier source

`src/templates/dsl/parseTemplate.ts` (137 lignes)

### Fonctions clés

| Fonction | Rôle |
|---|---|
| `parseTemplateDsl(dsl)` | Point d'entrée. Détecte si le DSL commence par `@roadmap` et délègue à `parseRoadmap` |
| `parseRoadmap(dsl)` | Parse complet du DSL roadmap. Retourne `RoadmapData` ou `ProductRoadmapData` |
| `stripQuotes(s)` | Supprime les guillemets et convertit `\n` littéral en vrais sauts de ligne |
| `parseStyleValue(value)` | Parse une valeur de style : essaie un nombre, sinon retourne la chaîne brute |
| `styleObj(record)` | Convertit un `Record<string, string\|number>` en `TemplateElementStyle` ou `undefined` |
| `flushMilestone()` | Fusionne le milestone en attente avec ses styles dans le tableau final |

### Algorithme de parsing

1. **Split** : le DSL est découpé en lignes, chaque ligne est nettoyée (`trim`).
2. **Filtrage** : les lignes vides et les commentaires `//` sont ignorés.
3. **Parsing ligne à ligne** : une boucle `for` itère sur chaque ligne :
   - Si la ligne commence par `@roadmap`, extrait le titre
   - Si `start "..."`, stocke `startLabel`
   - Si `finish "..."`, stocke `finishLabel`
   - Si `quarters ...`, active le mode grid et collecte les colonnes
   - Si `lanes ...`, collecte les lignes de la grille
   - Si `style key value`, applique au milestone en cours ou au style global
   - Si `milestone ...`, `flushMilestone()` puis stocke un `pendingMilestone`
4. **Flush final** : après la boucle, `flushMilestone()` est appelé pour traiter le dernier milestone.
5. **Détection du mode** : si `quarters` ou `lanes` ont des valeurs → `ProductRoadmapData`, sinon → `RoadmapData`.
6. **Fusion des styles** : pour chaque milestone, le style est fusionné : styles globaux + styles spécifiques au milestone (ces derniers écrasent les globaux).

### Diagramme de flux du parser

```
DSL (texte brut)
    │
    ▼
parseTemplateDsl()
    │
    ├── ne commence pas par @roadmap → null
    │
    └── commence par @roadmap → parseRoadmap()
            │
            ├── Split en lignes, filter vides/commentaires
            │
            ├── Boucle ligne par ligne :
            │     ├── @roadmap "Titre"    → title
            │     ├── start "Label"       → startLabel
            │     ├── finish "Label"      → finishLabel
            │     ├── quarters Q1 Q2...   → active mode grid
            │     ├── lanes Dev UX...     → lignes de la grille
            │     ├── style key value     → style global ou pending
            │     └── milestone "X" "Y"   → flush + nouveau pending
            │
            ├── flushMilestone() final
            │
            ├── quarters/lanes non vides ?
            │     ├── OUI → ProductRoadmapData { type: 'productRoadmap' }
            │     └── NON → RoadmapData { type: 'roadmap' }
            │
            └── Retourne TemplateData
```

---

## Intégration dans l'éditeur

### Composant `TemplateDslEditor`

`src/templates/panels/TemplateDslEditor.tsx` (99 lignes)

Ce composant React affiche une **zone de texte** (textarea) avec un exemple de DSL pré-rempli, et un bouton **"Parse & Render"**. 

L'interface présente :
- Une zone de texte monospace éditable
- Un bouton pour parser et afficher le template
- Une aide en bas avec les commandes disponibles

### Flux de données : DSL → Parser → Store → Composant

```
TemplateDslEditor
    │
    │  [clic sur "Parse & Render"]
    ▼
parseTemplateDsl(dsl)
    │
    │  retourne TemplateData (RoadmapData ou ProductRoadmapData)
    ▼
selectTemplateWithData(data.type, data)
    │
    │  met à jour useTemplateStore :
    │    - activeTemplate = data.type
    │    - templateData = data
    │    - réinitialise selectedIds, colors, positions
    ▼
TemplateRenderer
    │
    │  lit activeTemplate et templateData depuis le store
    │  sélectionne le bon composant dans TEMPLATE_MAP
    ▼
RoadmapTemplate  ou  ProductRoadmapTemplate
    │
    │  rendu SVG via le Canvas de l'éditeur
    ▼
Affichage dans le Canvas
```

### Coexistence avec les diagrammes Mermaid

Le `TemplateRenderer` est rendu dans le même Canvas SVG que les diagrammes Mermaid. Il est wrappé dans un `<g pointerEvents="all">` qui lui permet de recevoir les événements de souris (drag, clic) indépendamment des autres éléments SVG du Canvas. Les templates et les diagrammes Mermaid peuvent coexister côte à côte dans le même espace de dessin.
