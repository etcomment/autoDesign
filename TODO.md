# autoDesign — Todo List

## Terminé

### Phase 1 — Core + Canvas
- [x] Core Engine: DiagramModel, Shape, validation (13 tests)
- [x] Command Pattern: undo/redo atomique (13 tests)
- [x] Zustand store: shapes, selection, viewBox
- [x] Canvas SVG: pan/zoom molette, grid, snapping
- [x] 3 formes: Rectangle, Ellipse, Diamond
- [x] Shape Library panel: drag & drop
- [x] Properties Panel: fill, stroke, strokeWidth, text, color picker (palette + hex)
- [x] Selection: clic, Ctrl+clic, marquee
- [x] Resize handles (4 coins, undo atomique)
- [x] Toolbar: undo, redo, delete, connect mode, export dropdown
- [x] Export SVG standalone (7 tests)
- [x] Raccourcis clavier: Ctrl+Z, Ctrl+Y, Delete, Middle-click pan
- [x] Text wrapping automatique dans les formes

### Phase 2 — Mermaid + Connexions
- [x] Connection type: add/remove avec undo/redo (7 tests)
- [x] Mode connexion: bouton Link, clic source → cible
- [x] Rendu connecteurs: courbes Bezier avec flèches
- [x] Mermaid parser: graph/flowchart TD/LR/RL/BT (10 tests)
- [x] Formes Mermaid: `[text]`, `(text)`, `{text}`, `((text))`
- [x] Arêtes Mermaid: `-->`, `-- text -->`, `==>`, `-.->`, `---`
- [x] Dagre layout engine
- [x] Merge intelligent: re-import préserve positions existantes
- [x] MermaidEditor panel: textarea + Import

### Phase 3 — Export
- [x] Export SVG (7 tests)
- [x] Export PPTX vectoriel natif (5 tests) — pptxgenjs v4
- [x] Export PNG par rasterisation canvas
- [x] Export JPG par rasterisation canvas
- [x] Dropdown export multi-format dans la toolbar
- [x] Couleurs mappées correctement (fill → PPTX fill, stroke → PPTX line)
- [x] Texte exporté dans le PPTX

---

## À faire

### Bugs
- [ ] **Subgraphs Mermaid visuels** : `subgraph title ... end` — afficher un cadre groupé
- [ ] **Snapping à la grille** : alignement des formes pendant drag/resize
- [ ] **Coordonnées négatives** : les formes ne devraient pas pouvoir avoir de dimensions négatives
- [ ] **Export PPTX** : les connexions en ligne simple, pas de vraies courbes — ajouter flèches PPTX

### Features — Éditeur
- [ ] **Rotate** : poignée de rotation sur les formes sélectionnées
- [ ] **Alignement** : toolbar pour aligner (gauche, centre, droite, haut, milieu, bas)
- [ ] **Distribute** : espacement égal horizontal/vertical
- [ ] **Copier/Coller** : Ctrl+C, Ctrl+V avec undo
- [ ] **Group/Ungroup** : Ctrl+G, Ctrl+Shift+G
- [ ] **Verrouillage** : lock une forme (position + dimensions fixes)
- [ ] **Z-order** : bring to front, send to back (Ctrl+[, Ctrl+])
- [ ] **Snap to grid** : option activable/désactivable
- [ ] **Smart guides** : lignes d'alignement pendant le drag

### Features — Formes
- [ ] **Plus de types de formes** : triangle, pentagon, hexagone, arrow, star
- [ ] **Formes flowchart** : process, decision, document, data, terminator
- [ ] **Formes Lucide** : bibliothèque d'icônes (server, cloud, database, etc.)
- [ ] **Shape Library extensible** : stockage JSON + lazy loading par catégorie
- [ ] **Styles personnalisés** : ombre portée, dégradés, coins arrondis variables

### Features — Connexions
- [ ] **Routage orthogonal** : connecteurs en angle droit (pas juste Bezier)
- [ ] **Points d'ancrage** : choisir le point d'attache sur la forme (haut, bas, gauche, droite)
- [ ] **Label sur connexion** : texte sur l'arête (ex: "click" → affiché)
- [ ] **Styles de ligne** : solide, pointillé, épais
- [ ] **Flèches** : début/fin configurables (none, arrow, diamond)

### Features — Mermaid
- [ ] **Subgraphs visuels** : rendu d'un rectangle groupé avec titre
- [ ] **Styling Mermaid** : `style A fill:#f9f,stroke:#333`
- [ ] **ClassDef Mermaid** : `classDef default fill:#fff`
- [ ] **Sequence diagrams** : `sequenceDiagram` → lignes de vie verticales
- [ ] **Class diagrams** : `classDiagram` → rectangles UML
- [ ] **Mermaid → positions stockées en commentaire** : `%% pos: 100,200`
- [ ] **Export Mermaid** : générer du DSL depuis le modèle visuel

### Features — Export
- [ ] **Export multi-pages** : une slide par couche/groupe
- [ ] **Export avec fond** : couleur de fond personnalisée pour PNG/JPG
- [ ] **Export sélection seule** : exporter uniquement les formes sélectionnées
- [ ] **Copier SVG** : bouton "Copy SVG to clipboard"
- [ ] **Taille d'export** : choix résolution 1x/2x/3x pour PNG/JPG
- [ ] **Export PDF** (bonus)

### Features — Persistence & Projet
- [ ] **Save/Load** : fichier .json projet (export/import complet)
- [ ] **Auto-save** : IndexedDB avec debounce 2s
- [ ] **Crash recovery** : restore dernier état valide à l'ouverture
- [ ] **Recent files** : liste des derniers projets ouverts
- [ ] **Templates** : bibliothèque de diagrammes pré-faits
- [ ] **Thème global** : palettes de couleurs, polices par défaut

### Features — UX/UI
- [ ] **Zoom UI** : affichage du niveau de zoom (ex: "100%")
- [ ] **Fit to screen** : centrer tout le contenu
- [ ] **Dark mode** : thème sombre
- [ ] **Minimap** : vue miniature pour navigation
- [ ] **Panels redimensionnables** : drag de la bordure des panels
- [ ] **Introspection** : inspecter les propriétés d'une forme (ID, type, etc.)

### Features — Backend (Phase 4)
- [ ] **API REST** : Node.js/Express (sauvegarde cloud, partage)
- [ ] **Collaboration temps réel** : WebSockets
- [ ] **Auth** : login simple (GitHub OAuth ou magic link)
- [ ] **Galerie publique** : partage de diagrammes

### Technique
- [ ] **Code splitting** : lazy load pptxgenjs et dagre (bundle trop gros: ~675KB)
- [ ] **Tests UI** : intégration canvas avec React Testing Library
- [ ] **Storybook** : composants documentés
- [ ] **CI/CD** : GitHub Actions (lint, test, build)
- [ ] **i18n** : support français/anglais
