# autoDesign

Éditeur de diagrammes SVG avec système de templates : composition de slides à partir de gabarits éditables (puzzles, funnels, roadmaps, pie charts, value chains...), et import de slides PowerPoint existantes en templates vectoriels éditables.

## Stack

- React 19 + TypeScript (strict) + Vite 8
- Zustand + immer (state)
- Vitest + React Testing Library
- pptxgenjs v4 (export PPTX), pptx-svg (import PPTX), dagre (layout graphe)
- Lucide React (icônes)

## Commandes

```bash
npm run dev          # Dev server
npm run build        # tsc -b && vite build
npm test             # vitest run
npm run test:watch   # vitest (watch mode)
npm run lint         # oxlint
```

## Fonctionnalités principales

- **Éditeur de canvas** : formes, connexions, redimensionnement, undo/redo (Command Pattern dans `src/core/`).
- **Galerie de templates** : gabarits DSL (`src/templates/`) instanciables et éditables sur le canvas — syntaxe documentée dans `docs/TEMPLATE_DSL.md`.
- **Pie Charts** (`@pieChart1` à `@pieChart5`) : donuts segments par lignes `slice`, gap de largeur constante, valeur = pourcentage littéral.
- **Import PPTX/POTX** : conversion d'une slide PowerPoint réelle en template vectoriel segmenté (suppression du chrome, clusterisation en cartes éditables, export `.tsx`). Voir `docs/IMPORT_ENGINE.md`.
- **Export** : SVG, image, PPTX (`src/export/`).
- **Page admin cachée** : accessible via `#admin` dans l'URL (mot de passe requis) — gestion des templates importés.

## Structure

```
src/
├── core/           # Engine pur, pas de React (model, commands, validation)
├── editor/         # Canvas, rendu des formes, poignées, connexions
├── panels/         # Bibliothèques, propriétés, toolbar, drawer code
├── templates/      # Système de templates : DSL, registry, composants, import
├── admin/          # Page d'administration cachée (#admin)
├── export/         # generateSvg, generatePptx, generateImage
├── mermaid/        # parseMermaid (parser DSL)
├── store/          # diagramStore (Zustand)
├── hooks/          # Hooks réutilisables
└── lib/            # Wrappers (interact.js, pptxgenjs), thème
```

## Documentation

| Document | Contenu |
| --- | --- |
| [docs/TEMPLATE_DSL.md](docs/TEMPLATE_DSL.md) | Syntaxe DSL des templates (sections par catégorie) |
| [docs/IMPORT_ENGINE.md](docs/IMPORT_ENGINE.md) | Moteur d'import PPTX : pipeline, segmentation, limites |
| [docs/TEMPLATE_SYSTEM.md](docs/TEMPLATE_SYSTEM.md) | Architecture du système de templates |
| [AGENTS.md](AGENTS.md) | Conventions de développement |
